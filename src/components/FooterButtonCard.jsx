import { Box, Paper } from "@mantine/core";
import React from "react";

const FooterButtonCard = ({ children }) => {
  return (
    <Box
      sx={{
        height: 70,
        // marginBottom: -15,
        position: "relative",
        width: "100%",
      }}
    >
      <Paper
        shadow="xl"
        p={"md"}
        radius={"md"}
        sx={{
          marginTop: "calc(var(--mantine-footer-height, 0px) + 1rem)",
          marginBottom:
            "calc(0px - calc(var(--mantine-footer-height, 0px) + 1rem))",
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          zIndex: 99,
          // width: "100%",
          justifyContent: "flex-end",
          gap: 15,
          width:
            "calc(100% - calc(calc(var(--mantine-navbar-width, 0px) + 1rem) + calc(var(--mantine-aside-width, 0px) + 1rem)))",
        }}
        bg="#fff"
        pos={"fixed"}
        bottom={15}
        withBorder
        display={"flex"}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default FooterButtonCard;
