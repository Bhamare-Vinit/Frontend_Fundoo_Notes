import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import {
  LightbulbOutlined as Lightbulb,
  NotificationsOutlined as Notification,
  ModeEditOutlined as Edit,
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Trash,
} from "@mui/icons-material";

const NavList = ({ open, selectedTab, setSelectedTab }) => {
  const location = useLocation();
  const navList = [
    { id: 1, name: "Notes", icon: <Lightbulb />, path: "/home" },
    { id: 2, name: "Reminders", icon: <Notification /> },
    { id: 3, name: "Edit Labels", icon: <Edit /> },
    { id: 4, name: "Archive", icon: <Archive />, path: "/home/archive" },
    { id: 5, name: "Bin", icon: <Trash />, path: "/home/trash" },
  ];

  React.useEffect(() => {
    // Update the selected tab based on the current route
    const currentItem = navList.find((item) => item.path === location.pathname);
    if (currentItem) {
      setSelectedTab(currentItem.name); // Update selectedTab state
    }
  }, [location.pathname, navList, setSelectedTab]);

  return (
    <List>
      {navList.map((list) => (
        <ListItem
          key={list.id}
          disablePadding
          sx={{ display: "block" }}
          // onClick={() => setSelectedTab(list.name)}
        >
          <ListItemButton
            component={Link}
            to={list.path}
            onClick={() => setSelectedTab(list.name)}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },

              selectedTab === list.name && {
                // backgroundColor: "#f0f0f0",
                backgroundColor: "#feefc3",

              },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
                // selectedTab === list.name && {
                //   // backgroundColor: "#f0f0f0",
                //   backgroundColor: "#feefc3",
                // },
              ]}
            >
              {list.icon}
            </ListItemIcon>
            <ListItemText
              primary={list.name}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;
