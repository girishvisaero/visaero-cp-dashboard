import {
  AppShell,
  Box,
  Image,
  LoadingOverlay,
  Navbar,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useNetwork } from "@mantine/hooks";
import React, { useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/visaeroLogo.png";
import MainLinks from "../components/MainLinks";
import UserDetails from "../components/UserDetails";
import {
  useEnterpriseAccount,
  useGloblePermission,
} from "../services/globelState";
import NetworkError from "../components/NetworkError";


const Layout = () => {
  const networkStatus = useNetwork();

  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, data } = useEnterpriseAccount();
  const permission = useGloblePermission(data?.data);

  const theme = useMantineTheme();

  useMemo(() => window.scrollTo(0, 0), [location]);

  useEffect(() => {
    let isSessionVerified = permission?.data?.data.data === "success";
    if (
      (permission?.data && !isSessionVerified) ||
      !localStorage.getItem("session_id")
    ) {
      navigate("/login");
      localStorage.removeItem("session_id");
    }
  }, [permission]);

  return (
    <>
      <Box>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <AppShell
          styles={{
            main: {
              background:
                theme.colors.gray[0] || theme.colors.secondary_color[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar p="xs" width={{ base: 300 }}>
              <Navbar.Section
                sx={{
                  borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
                }}
                p="sm"
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 15,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Image src={Logo} height={50} width={50} fit="contain" />
                </Box>
              </Navbar.Section>
              <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                <Box py="md">
                  <MainLinks />
                </Box>
              </Navbar.Section>
              <Navbar.Section>
                <UserDetails />
              </Navbar.Section>
            </Navbar>
          }
        >
          {networkStatus.online ? (
            <Outlet />
          ) : (
           <NetworkError/>
          )}
        </AppShell>
      </Box>
    </>
  );
};

export default Layout;
