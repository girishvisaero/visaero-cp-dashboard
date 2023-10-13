import { Box, Grid, Paper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { memo, useEffect, useState } from "react";
import { getNationalities, getOrigin, getTravellingTo } from "../services";
import { useLocalDetails } from "../services/globelState";
import AutoSelectCountry from "./AutoSelectCountry";

const CountriesSelectCard = ({ getData }) => {
  const { data: ipData } = useLocalDetails();
  const [isCorRequired, setIsCorRequired] = useState(false);
  const [payload, setPayload] = useState({
    nationality: {},
    travelling_to: {},
    country_of_origin: {},
  });

  const { data: nationalitiesData } = useQuery({
    queryKey: ["nationalities"],
    queryFn: getNationalities,
  });

  const { data: originData } = useQuery({
    queryKey: ["origin"],
    queryFn: getOrigin,
  });

  const origin = payload?.country_of_origin?.name;
  const nationality = payload?.nationality?.name;

  const isEnabledTravellingTo =
    !!nationalitiesData &&
    nationalitiesData?.data?.data === "success" &&
    !!nationality;

  const { data: travellingToData } = useQuery({
    enabled: isEnabledTravellingTo,
    queryKey: ["travellintTo", { nationality, origin: nationality }],
    queryFn: getTravellingTo,
  });

  const nationalityArr = nationalitiesData?.data?.dataobj?.data ?? [];
  const travellingToArr = travellingToData?.data?.dataobj?.data ?? [];
  const originArr = originData?.data?.dataobj?.data ?? [];


  useEffect(() => getData(payload), [payload]);

  return (
    <Box>
      <Paper shadow="xs" radius="md" p="xl" mb="md">
        <Grid>
          <Grid.Col span={4}>
            <AutoSelectCountry
              defaultCountryName={ipData?.country_name}
              data={nationalityArr ?? []}
              label="Nationality"
              setPayload={setPayload}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <AutoSelectCountry
              data={travellingToArr ?? []}
              label="Travelling to"
              setPayload={setPayload}
              setIsCorRequired={setIsCorRequired}
            />
          </Grid.Col>
          <Grid.Col span={4} display={!isCorRequired && "none"}>
            <AutoSelectCountry
              defaultCountryName={ipData?.country_name}
              data={originArr ?? []}
              label="Country of Origin"
              setPayload={setPayload}
              isCorRequired={isCorRequired}
            />
          </Grid.Col>
        </Grid>
      </Paper>
    </Box>
  );
};

export default memo(CountriesSelectCard);
