import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import DashboardDetailsCard from "../../components/DasbhoardDetailsCard";
import DashboardPieChart from "../../components/DashboardPieChart";
import DashboardTopListCard from "../../components/DashboardTopListCard";
import { priceFormat } from "../../lib/utils";
import { getDashboardData } from "../../services";
import { useGloblePermission } from "../../services/globelState";

// <============= icons ================>
import { ReactComponent as ArchiveIcon } from "../../assets/archiveIcon.svg";
import { ReactComponent as BotIcon } from "../../assets/botIcon.svg";
import { ReactComponent as DecistionTakenIcon } from "../../assets/decisionTakenIcon.svg";
import { ReactComponent as FileIcon } from "../../assets/fileIcon.svg";
import { ReactComponent as HeldIcon } from "../../assets/heldIcon.svg";
import { ReactComponent as PendingIcon } from "../../assets/pendingIcon.svg";
import { ReactComponent as RpaBotIcon } from "../../assets/rpaIcon.svg";
import { ReactComponent as RpaProcessIcon } from "../../assets/rpaProcessIcon.svg";
import DatePickerComponent from "../../components/DatePickerComponent";

const Dashboard = () => {
  const theme = useMantineTheme();
  const accountDetails = useGloblePermission();
  const [value, setValue] = useState([
    dayjs(new Date()).set("date", 1).toDate(),
    dayjs(new Date()).add(7, "day").toDate(),
  ]);

  const dates = [dayjs(value[0]).format(), dayjs(value[1]).format()];

  const start_date = dates[0];
  const end_date = dates[1];

  const isValidDates =
    !start_date ||
    !end_date ||
    start_date == "Invalid Date" ||
    end_date == "Invalid Date";

  const { data, isFetching } = useQuery({
    enabled:
      !!accountDetails?.data?.data?.data &&
      accountDetails?.data?.data?.data === "success" &&
      !isValidDates,
    queryKey: ["dashboard", dates],
    queryFn: getDashboardData,
    keepPreviousData: true,
  });

  const dataObj = data?.data?.dataobj ?? {};

  const businessHealth = dataObj?.business_health ?? {};
  const applicationsStatData = dataObj?.dt_range_statistics ?? {};
  const applicationsDetailsStatData = dataObj?.dt_range_detailed_stats ?? [];

  const chartData = [
    { name: "In Draft", value: applicationsStatData?.draft_applications ?? 0 },
    {
      name: "Pending Submission",
      value: applicationsStatData?.pending_submission ?? 0,
    },
    {
      name: "Held Application",
      value: applicationsStatData?.held_applications ?? 0,
    },
    {
      name: "Archived",
      value: applicationsStatData?.archived_applications ?? 0,
    },
    { name: "Submitted To RPA", value: applicationsStatData?.submitted_to_rpa },
  ];

  //
  const progressData = {
    applicationsData: [
      {
        icon: FileIcon,
        label: "In Draft",
        total: applicationsStatData?.draft_applications ?? 0,
        action: () => console.log("working1"),
      },
      {
        icon: PendingIcon,
        label: "Pending Submission",
        total: applicationsStatData?.pending_submission ?? 0,
        action: () => console.log("working2"),
      },
      {
        icon: HeldIcon,
        label: "Held Applicaiton",
        total: applicationsStatData?.held_applications ?? 0,
        action: () => console.log("working"),
      },
      {
        icon: ArchiveIcon,
        label: "Archived",
        total: applicationsStatData?.archived_applications ?? 0,
        action: () => console.log("working"),
      },
    ],
    applicationsSubmittedData: [
      {
        icon: BotIcon,
        label: "Submitted to RPA",
        total: applicationsStatData?.submitted_to_rpa ?? 0,
        action: () => console.log("working1"),
      },
      {
        icon: RpaBotIcon,
        label: "RPA Queue",
        total: applicationsStatData?.in_rpa_queue ?? 0,
        action: () => console.log("working2"),
      },
      {
        icon: RpaProcessIcon,
        label: "RPA Processed",
        total: applicationsStatData?.rpa_processed ?? 0,
        action: () => console.log("working"),
      },
      {
        icon: DecistionTakenIcon,
        label: "Decision Taken",

        total: applicationsStatData?.decision_taken ?? 0,
        action: () => console.log("working"),
      },
    ],
  };

  const statisticButton = ({ icon: Icon, label, total, action }, i) => (
    <Grid.Col
      key={i}
      span={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        component="h3"
        ta={"center"}
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Icon />
        {total}
      </Box>
      <Button onClick={action}>{label}</Button>
    </Grid.Col>
  );

  const statisticCard = (
    <Card
      shadow="md"
      mih={300}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Card.Section>
        <Grid justify="center">
          {progressData?.applicationsData.map(statisticButton)}
        </Grid>
      </Card.Section>
      <Divider size="md" bg={theme.primaryColor} />
      <Card.Section>
        <Grid justify="center">
          {progressData?.applicationsSubmittedData.map(statisticButton)}
        </Grid>
      </Card.Section>
    </Card>
  );

  const otherTopListData = applicationsDetailsStatData.map((obj, i) => (
    <Grid.Col span={4} key={i}>
      <DashboardDetailsCard
        headerColumnsKey={[obj?.block_name, "Applications"]}
        data={obj?.stats}
      />
    </Grid.Col>
  ));

  return (
    <div>
      <AppBar name="Dashboard" />

      <Box>
        <Box display="flex" sx={{ justifyContent: "space-between" }}>
          <Text size="xl" fw={700} mb={"md"} color="dark">
            Business Health
          </Text>
          <Box>
            <DatePickerComponent value={value} onChange={(d) => setValue(d)} />
            {/* <DatePickerInput
              icon={<IconCalendar size="1.1rem" stroke={1.5} />}
              type="range"
              numberOfColumns={2}
              // label="Select date"
              locale=""
              placeholder="Select dates"
              value={value}
              onChange={(d) => setValue(d)}
              ml="auto"
              maw={315}
            /> */}
          </Box>
        </Box>
        <Grid>
          {isFetching ? (
            <BusinessHealthLoading />
          ) : (
            <>
              <Grid.Col span={4}>
                <Card
                  shadow="md"
                  mih={300}
                  bg={theme.primaryColor}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    component="h1"
                    sx={{ fontSize: "2rem", color: "#fff" }}
                    align="center"
                  >
                    {priceFormat(businessHealth?.all_applications)}
                  </Text>
                  <Card.Section>
                    <Text
                      component="h1"
                      sx={{ fontSize: "1.6rem", color: "#e5e5e5" }}
                      align="center"
                    >
                      Total Applications
                    </Text>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={8}>{statisticCard}</Grid.Col>
            </>
          )}

          <Grid.Col span={12}>
            <Text size="xl" fw={700} color="dark">
              Statistics
            </Text>
          </Grid.Col>
          {isFetching ? (
            <StatisticsLoading />
          ) : (
            <>
              <Grid.Col span={4}>
                <Card shadow="md">
                  <DashboardPieChart data={chartData} />
                  <Card.Section>
                    <Text
                      component="h1"
                      mb={0}
                      color={theme.primaryColor}
                      align="center"
                    >
                      {applicationsStatData?.all_applications}
                    </Text>
                    <Text
                      mt={0}
                      component="h1"
                      sx={{ fontSize: "1.3rem" }}
                      color={"dimmed"}
                      align="center"
                    >
                      Total Applications
                    </Text>
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col span={4}>
                <DashboardTopListCard
                  header={"Top 5 Destinations"}
                  data={businessHealth?.top_five_destinations}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DashboardTopListCard
                  header={"Top 5 Nationalities"}
                  data={businessHealth?.top_five_nationalities}
                />
              </Grid.Col>
            </>
          )}
          {otherTopListData}
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;

const BusinessHealthLoading = () => (
  <>
    <Grid.Col span={4}>
      <Skeleton mih={300} />
    </Grid.Col>
    <Grid.Col span={8}>
      <Skeleton mih={300} />
    </Grid.Col>
  </>
);
const StatisticsLoading = () => (
  <>
    <Grid.Col span={4}>
      <Skeleton mih={300} />
    </Grid.Col>
    <Grid.Col span={4}>
      <Skeleton mih={300} />
    </Grid.Col>
    <Grid.Col span={4}>
      <Skeleton mih={300} />
    </Grid.Col>
  </>
);
