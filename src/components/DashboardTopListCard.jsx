import {
  Box,
  Card,
  Image,
  Progress,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

const DashboardTopListCard = ({ data, header }) => {
  const theme = useMantineTheme();

  const noDataFoundRow = (
    <td colSpan={2}>
      <Box
        component="h1"
        sx={{ textAlign: "center", color: "#cdc6c6" }}
        fz={"md"}
        color="dimmed"
      >
        Nothing Found
      </Box>
    </td>
  );

  const renderBody = (data ?? []).slice(0, 5).map((element, i, arr) => {
    let percent = (element.value / arr[0].value) * 100;
    let img =
      `https://s3-ap-southeast-1.amazonaws.com/visaero.assets/flags/${(
        element?._id ?? ""
      )
        .split(" ")
        .join("_")}.png` ?? "";
    return (
      <Box component="tr" key={i}>
        <td>
          <Image
            sx={{
              border: "1px solid " + theme.colors.gray[3],
              background: theme.colors.gray[1],
            }}
            height={15}
            width={25}
            src={img}
          />
        </td>
        <td>{element?._id}</td>
        <td>{element?.value}</td>
        <td style={{ width: 100 }}>
          <Progress value={percent ?? 0} />
        </td>
      </Box>
    );
  });
  const rows = data?.length > 0 ? renderBody : noDataFoundRow;

  // const rows = getRowsData();

  return (
    <Card mih={300} withBorder shadow="md">
      <Card.Section>
        <Table highlightOnHover horizontalSpacing="sm" verticalSpacing="sm">
          <thead>
            <tr>
              <th colSpan={4}>
                <Text component="h1" m="0" px="5px">
                  {header}
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card.Section>
    </Card>
  );
};

export default DashboardTopListCard;
