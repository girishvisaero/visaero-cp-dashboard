import {
  Box,
  Card,
  ScrollArea,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

const DashboardDetailsCard = ({ data, headerColumnsKey }) => {
  const theme = useMantineTheme();

  // list rendered here 👇
  const renderList = (arr) =>
    arr.map((element, i) => (
      <Box component="tr" key={i}>
        <td align="center">{element?._id}</td>
        <td align="center">{element?.value}</td>
      </Box>
    ));

  let LimitData = (data ?? []).slice(0, 5);

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
  const rows = LimitData.length > 0 ? renderList(LimitData) : noDataFoundRow;

  let moreItems = (data ?? []).length - 5;

  let completData = () => (
    <Table highlightOnHover>
      <Box component="thead" sx={{ position: "sticky", top: 0 }}>
        <tr>{header}</tr>
      </Box>
      <tbody>{renderList(data)}</tbody>
    </Table>
  );

  const openViewMore = () => {
    const body = completData();
    modals.open({
      children: body,
      centered: true,
      scrollAreaComponent: ScrollArea.Autosize,
      labels: { confirm: "Confirm", cancel: "Cancel" },
    });
  };

  const renderHeader = (headerArr = []) => {
    return headerArr.map((header, i) => (
      <th key={i} align="center">
        <Text component="h1" m="0" align="center" px="5px">
          {header}
        </Text>
      </th>
    ));
  };

  const header = renderHeader(headerColumnsKey);

  return (
    <Card mih={300} withBorder shadow="md">
      <Card.Section>
        <Table horizontalSpacing="sm" highlightOnHover verticalSpacing="sm">
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>{rows}</tbody>
          {moreItems > 1 && (
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <Text
                    align="end"
                    sx={{
                      fontSize: "0.8rem",
                      textDecoration: "underline",
                    }}
                    color="dimmed"
                    m="0"
                    px="5px"
                  >
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => openViewMore()}
                    >
                      {moreItems} More
                    </Box>
                  </Text>
                </td>
              </tr>
            </tfoot>
          )}
        </Table>
      </Card.Section>
    </Card>
  );
};

export default DashboardDetailsCard;
