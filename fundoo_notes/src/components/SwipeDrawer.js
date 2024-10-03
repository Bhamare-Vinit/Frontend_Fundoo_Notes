import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import HeaderBar from "./HeaderBar";
import { Nav } from "react-bootstrap";
import NavList from "./NavList";
import { getNote } from "../services/userServices";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer({
  selectedTab,
  setSelectedTab,
  layoutType,
  setLayoutType,
  setSearchQuery,
  open,
  setOpen,
}) {
  // const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen((preState) => !preState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <HeaderBar
        open={open}
        handleDrawer={handleDrawer}
        layoutType={layoutType}
        setLayoutType={setLayoutType}
        setSearchQuery={setSearchQuery}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <NavList
          open={open}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        {/* <Divider /> */}
      </Drawer>
    </Box>
  );
}
