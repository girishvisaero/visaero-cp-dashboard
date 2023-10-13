import {
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,
    borderRadius: 5,
    "&:not(.active)": {
      "&:hover": {
        backgroundColor: theme.colors[theme.primaryColor][0] + "40",
        color: theme.black,
      },
    },
    "&.active": {
      background: theme.colors[theme.primaryColor][0],
      color: "#fff",
    },
    "& .nav-icon": {
      color: "#fff",
    },
  },

  link: {
    borderRadius: 5,
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[7],
    "&.nav-link": {
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      paddingLeft: rem(31),
      marginLeft: rem(30),
      borderLeft: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },

    "&:not(.active)": {
      "& .nav-icon": {
        color: "#fff",
      },
      "&:hover": {
        backgroundColor: theme.colors[theme.primaryColor][0] + "40",
        color: theme.black,
      },
    },
    "&.active": {
      background: theme.colors[theme.primaryColor][0],
      color: "#fff",
      "& button, button:hover": {
        color: "#fff",
      },
      "& .icon-wrapper": {
        background: "#fff",
        "& .nav-icon": {
          color: theme.colors[theme.primaryColor][0],
        },
      },
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

function LinksGroup({ icon: Icon, label, initiallyOpened, group, link: path }) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(group);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? group : []).map(({ link: path, label }) => (
    <NavLink className={`${classes.link} nav-link`} key={label} to={path}>
      <Text>{label}</Text>
    </NavLink>
  ));

  const button = (
    <UnstyledButton
      onClick={() => setOpened((o) => !o)}
      className={classes.control}
    >
      <Group position="apart" spacing={0}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ThemeIcon className="icon-wrapper" variant="light" size={30}>
            <Icon className={"nav-icon"} size="1.1rem" />
          </ThemeIcon>
          <Box ml="md">{label}</Box>
        </Box>
        {hasLinks && (
          <ChevronIcon
            className={classes.chevron}
            size="1rem"
            stroke={1.5}
            style={{
              transform: opened
                ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                : "none",
            }}
          />
        )}
      </Group>
    </UnstyledButton>
  );

  const navButton = hasLinks ? (
    button
  ) : (
    <NavLink to={path} className={classes.link}>
      {button}
    </NavLink>
  );

  return (
    <>
      {navButton}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

export default LinksGroup;
