import React, { useState } from "react";
import SwipeDrawer from "../components/SwipeDrawer";
import Notes from "../notes/Notes";
import { AddBoxOutlined } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("Notes");
  const [layoutType, setLayoutType] = useState("grid");
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state

  return (
    <Box style={{ display: "flex", width: "100%" }}>
      <SwipeDrawer
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        layoutType={layoutType}
        setLayoutType={setLayoutType}
        searchQuery={searchQuery} // Pass searchQuery state to SwipeDrawer
        setSearchQuery={setSearchQuery} // Pass setSearchQuery to allow updates
      />
      <Notes
        selectedTab={selectedTab}
        layoutType={layoutType}
        searchQuery={searchQuery}
      />
      {/* <Outlet /> */}
    </Box>
  );
};

export default Home;
