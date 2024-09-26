import React, { useState } from "react";
import SwipeDrawer from "../components/SwipeDrawer";
import Notes from "../notes/Notes";
import { AddBoxOutlined } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("Notes");
  const [layoutType, setLayoutType] = useState("grid");

  return (
    <Box style={{ display: "flex", width: "100%" }}>
      <SwipeDrawer selectedTab={selectedTab} setSelectedTab={setSelectedTab} layoutType={layoutType} setLayoutType={setLayoutType}/>
      <Notes selectedTab={selectedTab} layoutType={layoutType}/>
    </Box>
  );
};

export default Home;
