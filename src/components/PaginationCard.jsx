import { Box, Pagination } from "@mantine/core";
import React from "react";

const PaginationCard = ({ setPage, pageLength, pageLimit }) => {
  return (
    <Box h={60} pos={"relative"}>
      <Box
        p={"md"}
        sx={(theme) => ({
          height: 75,
          background: "#fff",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          boxShadow: "3px 3px 10px #888",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          position: "fixed",
          bottom: 0,
          width:
            "calc(100% - calc(calc(var(--mantine-navbar-width, 0px) + 1rem) + calc(var(--mantine-aside-width, 0px) + 1rem)))",
        })}
      >
        <Pagination
          boundaries={1}
          total={parseInt(pageLength / pageLimit)}
          siblings={1}
          defaultValue={1}
          onChange={(p) => setPage(p)}
        />
      </Box>
    </Box>
  );
};

export default PaginationCard;
