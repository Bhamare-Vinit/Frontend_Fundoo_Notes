import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import Box from "@mui/material/Box";

const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;
const Heading = styled(Typography)`
  color: #5f6368;
  font-size: 24px;
  margin-left: 25px;
`;

const HeaderBar = ({ open, handleDrawer, layoutType, setLayoutType }) => {
  const toggleLayout = () => {
    // Toggle between "grid" and "list"
    setLayoutType((prevType) => (prevType === "grid" ? "list" : "grid"));
  };
  const logo =
    "https://seeklogo.com/images/G/google-keep-logo-0BC92EBBBD-seeklogo.com.png";
  return (
    <Header open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: "20px",
            }}
          >
            <Menu />
          </IconButton>
          <img src={logo} alt="logo" style={{ width: 30 }} />
          <Heading>Keep</Heading>
        </Box>
        <Box>Searching</Box>
        <Box>
          <IconButton onClick={toggleLayout}>
            {layoutType === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
