import {
  Badge,
  Box,
  Button,
  Card,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import PaginationCard from "../../components/PaginationCard";
import { dateFormat, paginate } from "../../lib/utils";
import { getNewsAndUpdates } from "../../services";
import { useGloblePermission } from "../../services/globelState";

const NewsAndUpdates = () => {
  const accountDetails = useGloblePermission();
  const theme = useMantineTheme();
  const [page, setPage] = useState(1);

  let pageLimit = 10;

  const { data, isLoading } = useQuery({
    enabled:
      !!accountDetails?.data?.data?.data &&
      accountDetails?.data?.data?.data === "success",
    queryKey: ["newsAndUpdates"],
    queryFn: getNewsAndUpdates,
  });

  const cards = (obj, index) => (
    <Card key={index} radius={"md"} shadow="sm" padding="xl" p="md" mb="md">
      <Card.Section
        p="md"
        withBorder
        sx={{ display: "flex", gap: 15, justifyContent: "space-between" }}
      >
        <Box>
          <Text weight={500} size="lg">
            {obj?.news_title}
          </Text>
          <Badge  component="div" fz={'0.6rem'} sx={{ color: "#fff" }}>
            {obj?.sent_by_user_name}
          </Badge>
        </Box>
        {obj?.sent_on && (
          <Text weight={500} size="sm" color="dimmed">
            {dateFormat(obj?.sent_on)}
          </Text>
        )}
      </Card.Section>
      <Text mt="xs" color="dimmed" size="sm" mb="md">
        {obj?.news_message}
      </Text>
      To:{" "}
      <Text
        component="span"
        sx={{ textTransform: "capitalize" }}
        size="sm"
        weight={500}
        color={theme.primaryColor}
      >
        {(obj?.user_types[0] ?? "").split("_").join(" ")}
      </Text>
      {/* <Box component="span" sx={{textTransform:'capitalize', color: theme.primaryColor}}>{(obj?.user_types[0] ?? "").split('_').join(" ")}</Box> */}
      {/* <Box>
        <Badge sx={{ color: "#fff" }}>{obj?.sent_by_user_name}</Badge>
      </Box> */}
    </Card>
  );

  let noDataFound = <Text>Nothing found</Text>;

  let newAndUpdateArr = data?.data?.dataobj ?? [];

  let newsAndUpdateData = paginate([...newAndUpdateArr], page, pageLimit);

  const renderCards =
    newsAndUpdateData.length > 0 ? newsAndUpdateData.map(cards) : noDataFound;

  let items =
    data?.data && data?.data?.data === "success" ? renderCards : noDataFound;

  const loading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((emp, key) => (
    <NewsAndUpdatesSkeleton key={key} />
  ));

  return (
    <Box>
      {/* <LoadingOverlay visible={isLoading} overlayBlur={2} /> */}
      <AppBar name="News and Updates" />
      {isLoading ? loading : items}
      {newAndUpdateArr.length > pageLimit && (
        <PaginationCard
          setPage={setPage}
          pageLimit={pageLimit}
          pageLength={newAndUpdateArr.length}
        />
      )}
    </Box>
  );
};

export default NewsAndUpdates;

const NewsAndUpdatesSkeleton = () => {
  return (
    <Card radius={"md"} shadow="sm" padding="xl" p="md" mb="md">
      <Card.Section
        p="md"
        withBorder
        sx={{ display: "flex", gap: 15, justifyContent: "space-between" }}
      >
        <Box>
        <Skeleton visible width={300} mb={'md'}>
          Lorem ipsum dolor sit amet...
          {/* other content */}
        </Skeleton>
        <Skeleton visible radius={'md'} height={15} width={170}>
          Lorem ipsum dolor sit amet...
          {/* other content */}
        </Skeleton>
        </Box>
        <Skeleton visible width={"150px"} height={25}>
          Lorem ipsum dolor sit amet...
          {/* other content */}
        </Skeleton>
      </Card.Section>
      <Skeleton visible width={550} my={"md"}>
        Lorem ipsum dolor sit amet...
        {/* other content */}
      </Skeleton>
      <Skeleton visible height={25} width={150}>
        Lorem ipsum dolor sit amet...
        {/* other content */}
      </Skeleton>
    </Card>
  );
};
