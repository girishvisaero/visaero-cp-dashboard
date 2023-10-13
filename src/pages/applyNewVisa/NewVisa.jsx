import {
  Box,
  Button,
  Grid,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Select,
  Skeleton,
  Text,
  useMantineTheme
} from "@mantine/core";

import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import CountriesSelectCard from "../../components/CountriesSelectCard";
import DatePickerComponent from "../../components/DatePickerComponent";
import DocumentsUploadCard from "../../components/DocumentsUploadCard";
import FooterButtonCard from "../../components/FooterButtonCard";
import OfferCard from "../../components/OfferCard";
import { getSupportedCurrencies, getVisaOffers } from "../../services";
import { useLocalDetails } from "../../services/globelState";

const NewVisa = () => {
  const { data: ipData } = useLocalDetails();
  const [currency, setCurrency] = useState("");
  const [isSelected, setIsSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [visaOfferPayload, setVisaOfferPayload] = useState({});

  const [value, setValue] = useState([
    dayjs(new Date()).set("date", 1).toDate(),
    dayjs(new Date()).add(7, "day").toDate(),
  ]);

  const { data: currenciesDataObj } = useQuery({
    queryKey: ["supported-currencies"],
    queryFn: getSupportedCurrencies,
  });
  const {
    data: visaOffers,
    mutate,
    isLoading: isVisaOfferLoading,
  } = useMutation(getVisaOffers);

  const allValueExists = (obj) => Object.keys(obj).every((key) => !!obj[key]);

  const getData = (data) => {
    // console.log("data >>", data);
    const natinoality_obj = data?.nationality;
    const travelling_to_obj = data?.travelling_to;
    let obj = {
      managed_by: travelling_to_obj?.managed_by,
      nationality: natinoality_obj?.name,
      travelling_to: travelling_to_obj?.name,
      travelling_to_identity: travelling_to_obj?.identity,
      type: "apply_new_visa",
      currency,
    };

    if (allValueExists(obj)) {
      setVisaOfferPayload({ ...obj });
    }
  };

  let currenciesArr = currenciesDataObj?.data?.dataobj?.currencies ?? [];
  let currenciesData = currenciesArr.map((c) => c?.currency);
  let visaOffersData =
    (visaOffers?.data?.dataobj ?? [])?.filter((o) => o?.status === "active") ??
    [];

  const handleCurrencyChange = (currency) => {
    setCurrency(currency);
    setVisaOfferPayload((prev) => ({ ...prev, currency }));
  };

  // const isOffersLoading = useCallback((o)=> o,[]) 

  useEffect(() => {
    let curr = ipData?.currency ?? "USD";
    setCurrency(curr);
  }, [ipData]);

  useEffect(() => {
    if (Object.keys(visaOfferPayload).length > 0) {
      mutate(visaOfferPayload);
    }
  }, [visaOfferPayload]);

  const SECTION_HEIGHT = 410;

  const loadingCards = new Array(8).fill("").map((x, i) => (
    <Grid.Col span={6} key={i}>
      <Skeleton height={210} visible />
    </Grid.Col>
  ));

  const loader = (
    <Box>
      <Loader />
    </Box>
  );

  return (
    <div>
      {/* app bar */}
      <AppBar name="NewVisa" />
      {/* selection dropdown */}
      <CountriesSelectCard getData={getData} />
      {/* visa offers  */}
      <Grid>
        <Grid.Col span={8}>
          <Box
            display={"flex"}
            sx={{ justifyContent: "space-between" }}
            mb="md"
          >
            <Select
              value={currency}
              onChange={handleCurrencyChange}
              placeholder="Select a Currency"
              data={currenciesData}
              nothingFound="Nothing found..."
              searchable
            />
            <DatePickerComponent value={value} onChange={(d) => setValue(d)} />
          </Box>
          <Paper radius="md" shadow="sm">
            <ScrollArea type="always" offsetScrollbars h={SECTION_HEIGHT}>
              <Grid p={"sm"}>
                {isVisaOfferLoading ? (
                  loadingCards
                ) : visaOffersData?.length > 0 ? (
                  visaOffersData?.map((obj, i) => (
                    <Grid.Col span={6} key={i}>
                      <OfferCard
                        index={i}
                        isSelected={isSelected}
                        data={obj}
                        setIsSelected={setIsSelected}
                      />
                    </Grid.Col>
                  ))
                ) : (
                  <Grid.Col span={12}>Nothing Found!</Grid.Col>
                )}
              </Grid>
            </ScrollArea>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <DocumentsUploadCard cardHeight={SECTION_HEIGHT} />
        </Grid.Col>
      </Grid>
      {/* loading overlay */}
      <LoadingOverlay visible={isLoading} loader={loader} />
      {/* footer section */}
      <FooterButtonCard>
        <Button onClick={() => setIsLoading(true)}>Proceed</Button>
      </FooterButtonCard>
    </div>
  );
};

export default NewVisa;

const Loader = () => {
  const theme = useMantineTheme();
  const [state, setState] = useState("Please wait...");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let msgArr = [
    "Documents are being extracted...",
    "Documents are extracted!",
    "Creating an application...",
    "Wait a while...",
  ];

  useEffect(() => {
    for (let i = 0, p = Promise.resolve(); i < msgArr.length; i++) {
      p = p.then(() => delay(1500)).then(() => setState(msgArr[i]));
    }
  }, []);

  return (
    <>
      <Box component="span" bg={theme.primaryColor} className="custom-loader" />
      <Text>{state}</Text>
    </>
  );
};

// const OfferCardLoading = () => {
//   return ;
// };
