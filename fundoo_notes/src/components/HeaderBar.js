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
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Refresh from "@mui/icons-material/Refresh";

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

const HeaderBar = ({
  open,
  handleDrawer,
  layoutType,
  setLayoutType,
  searchQuery,
  setSearchQuery,
}) => {
  const toggleLayout = () => {
    setLayoutType((prevType) => (prevType === "grid" ? "list" : "grid"));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
        <Box>
          {/* <TextField
            id="input-with-icon-textfield"
            label="TextField"
            
            InputProps={{ disableUnderline: true }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
            variant="filled"
            value={searchQuery}
            onChange={handleSearchChange}

          /> */}
          {/* <TextField
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{ disableUnderline: true }}
          /> */}
          <TextField
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              height: "50px", // Adjust height
              width: "600px", // Adjust width
              backgroundColor: "#f5f5f5", // Light grey background
              borderRadius: "8px", // Rounded corners
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove default border
                },
              },
            }}
          />
        </Box>
        <Box>
          <IconButton onClick={toggleLayout}>
            {layoutType === "grid" ? (
              <ViewListIcon fontSize="large" />
            ) : (
              <ViewModuleIcon fontSize="large" />
            )}
          </IconButton>
          <IconButton>
            <Refresh fontSize="large" />
          </IconButton>
        </Box>

        <Box>
          {/* <IconButton fontSize="large" onClick={toggleLayout}>
            {layoutType === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
          </IconButton> */}
          <IconButton>
            <AccountCircle fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
