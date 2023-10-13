import {
  Box,
  Card,
  Divider,
  List,
  Paper,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import UploadDragImage from "./UploadDragImage";

const DocumentsUploadCard = ({ cardHeight }) => {
  const theme = useMantineTheme();
  const SECTION_HEIGHT = cardHeight + 50;
  return (
    <Paper shadow="sm" radius="md">
      <ScrollArea mx="-xs" type="always" p="xl" h={SECTION_HEIGHT}>
        <Box>
          <Card withBorder>
            <Card.Section
              bg={theme.colors[theme.primaryColor][0] + "40"}
              p="sm"
            >
              <Text fz={"md"} fw={500}>
                Documents
              </Text>
            </Card.Section>
            <Card.Section
              p="sm"
              sx={{
                "& li": { color: theme.colors.gray[6], fontSize: "0.8rem" },
                "& li::marker": { color: "#000" },
              }}
            >
              <Box>
                <Text size={"sm"}>Required Documents:</Text>
                <Box>
                  <List>
                    <List.Item sx={{ fontWeight: 400 }}>
                      <Box>Clone or download repository from GitHub</Box>
                      <Box sx={{ fontWeight: 300 }}>working</Box>
                    </List.Item>
                    <List.Item>Install dependencies with yarn</List.Item>
                    <List.Item>
                      To start development server run npm start command
                    </List.Item>
                  </List>
                </Box>
              </Box>
              <Divider my="sm" variant="dotted" />
              <Box>
                <Text size={"sm"}>Additional Documents:</Text>
                <Box>
                  <List>
                    <List.Item sx={{ fontWeight: 400 }}>
                      Clone or download repository from GitHub
                      <Box sx={{ fontWeight: 300 }}>working</Box>
                    </List.Item>
                    <List.Item>Install dependencies with yarn</List.Item>
                    <List.Item>
                      To start development server run npm start command
                    </List.Item>
                  </List>
                </Box>
              </Box>
            </Card.Section>
          </Card>
        </Box>
        <Divider my="sm" variant="dashed" />
        <UploadDragImage />
      </ScrollArea>
    </Paper>
  );
};

export default DocumentsUploadCard;
