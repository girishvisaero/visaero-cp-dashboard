import { Box, Button, Card, Skeleton, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import PaginationCard from "../../components/PaginationCard";
import { dateFormat, paginate } from "../../lib/utils";
import { getNotifications } from "../../services";
import { useGloblePermission } from "../../services/globelState";

const Notifications = () => {
  const accountDetails = useGloblePermission();
  const [page, setPage] = useState(1);

  let pageLimit = 10;

  const { data, isLoading } = useQuery({
    enabled:
      !!accountDetails?.data?.data?.data &&
      accountDetails?.data?.data?.data === "success",
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchOnWindowFocus: false,
  });

  const handleClick = (obj) => {
    // console.log(obj);
    let appData = obj?.data;

    if (appData) {
      var status = appData?.status;
      var application_id = appData?.application_id;
      // this.api_check_action_status(application_id, status, obj)
    }
  };

  const cards = (obj, index) => (
    <Card key={index} radius={"md"} shadow="sm" padding="xl" p="md" mb="md">
      <Card.Section
        p="md"
        withBorder
        sx={{ display: "flex", gap: 15, justifyContent: "space-between" }}
      >
        <Text weight={500} size="lg">
          {obj?.title}
        </Text>
       {obj?.issued_on && <Text weight={500} size="sm" color="dimmed">
          {dateFormat(obj?.issued_on)}
        </Text>}
      </Card.Section>
      <Text mt="xs" color="dimmed" size="sm" mb="md">
        {obj?.message}
      </Text>
      {(obj?.action ?? []).map((notificationObj, i) => (
        <Button key={i} onClick={handleClick}>
          {notificationObj?.display || ""}
        </Button>
      ))}
    </Card>
  );

  let noDataFound = <Text>Nothing found</Text>;

  let notifications = data?.data?.dataobj ?? [];

  let notificaionsData = paginate([...notifications], page, pageLimit);

  const renderCards =
    notificaionsData.length > 0 ? notificaionsData.map(cards) : noDataFound;

  let items =
    data?.data && data?.data?.data === "success" ? renderCards : noDataFound;

  const loading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((emp, key) => (
    <NotificationSkeleton key={key} />
  ));

  return (
    <Box>
      {/* <LoadingOverlay visible={isLoading} overlayBlur={2} /> */}
      <AppBar name="Notifications" />
      {isLoading ? loading : items}
      {notifications.length > pageLimit && (
        <PaginationCard
          setPage={setPage}
          pageLimit={pageLimit}
          pageLength={notifications.length}
        />
      )}
    </Box>
  );
};

export default Notifications;

const NotificationSkeleton = () => {
  return (
    <Card radius={"md"} shadow="sm" padding="xl" p="md" mb="md">
      <Card.Section
        p="md"
        withBorder
        sx={{ display: "flex", gap: 15, justifyContent: "space-between" }}
      >
        <Skeleton visible width={300}>
          Lorem ipsum dolor sit amet...
          {/* other content */}
        </Skeleton>
        <Skeleton visible width={"150px"} height={25}>
          Lorem ipsum dolor sit amet...
          {/* other content */}
        </Skeleton>
      </Card.Section>
      <Skeleton visible width={550} my={"md"}>
        Lorem ipsum dolor sit amet...
        {/* other content */}
      </Skeleton>
      <Skeleton visible height={45} width={150}>
        Lorem ipsum dolor sit amet...
        {/* other content */}
      </Skeleton>
    </Card>
  );
};
