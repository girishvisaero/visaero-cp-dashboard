import React from "react";
import { Outlet } from "react-router-dom";

const NoLayout = () => {
  
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NoLayout;
