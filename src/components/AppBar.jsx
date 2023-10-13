import { Anchor, Box, Text, useMantineTheme } from "@mantine/core";
import React from "react";

const AppBar = ({name = ""}) => {
  const theme = useMantineTheme();
  const items = [
    { title: "users", href: "#" },
    { title: "user", href: "#" },
    { title: "create", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      <Text color="dimmed" size="sm">
        {item.title}
      </Text>
    </Anchor>
  ));

  return (
    <Box sx={{ background: theme.colors.gray[3], borderRadius:'8px', color: theme.colors.gray[8] }} m='0px' mb='md' component="h3"  p='sm'>
      <Text size="lg">{name}</Text>
      {/* <Breadcrumbs
        sx={{ background: "#e3e3e3", borderRadius: "8px", flexWrap: "wrap", gap:0 }}
        p="md"
      >
        <Box sx={{ width: "100%" }}>
          <Text size="lg">Notifications</Text>
        </Box>
        {items}
      </Breadcrumbs> */}
    </Box>
  );
};

export default AppBar;
