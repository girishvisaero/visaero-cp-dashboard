import {
  Avatar,
  Box,
  Group,
  Indicator,
  Text,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useIdle } from "@mantine/hooks";
import { IconLogout2, IconUserCircle } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const idle = useIdle(3000, {
    initialState: false,
  });
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleSignout = () => {
    localStorage.setItem("session_id", "");
    localStorage.setItem("user_id", "");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,
          backgroundColor: theme.colors.gray[1],
          "&:hover": {
            backgroundColor: theme.colors.gray[3],
          },
        }}
      >
        <Group>
          <Indicator
            inline
            size={16}
            offset={7}
            position="bottom-end"
            color={!idle ? "green" : "red"}
            withBorder
          >
            <Avatar
              size="lg"
              radius="xl"
              sx={{ border: "1px solid #e3e3e3" }}
              src={
                // IconUserCircle
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              }
            />
            {/* <IconUserCircle
                fill={theme.colors.gray[2]}
                strokeWidth={"1px"}
                height="50px"
                width="50px"
              /> */}
          </Indicator>

          <Box sx={{ flexGrow: 1 }} mt="sm">
            <Text color="dimmed" size="xs">
              Girish Chaudhari
            </Text>
            <Text size="sm" weight={500} color={theme.primaryColor}>
              Super Admin
            </Text>
          </Box>
          <Tooltip
            arrowOffset={12}
            openDelay={1000}
            arrowSize={6}
            arrowRadius={2}
            label="Logout"
            withArrow
            
            position="right-start"
          >
            <IconLogout2 onClick={handleSignout} />
          </Tooltip>
        </Group>
      </UnstyledButton>
      <Text color={"dimmed"} size="xs" align="center">
        Version 1.2.0
      </Text>
    </Box>
  );
};

export default UserDetails;
