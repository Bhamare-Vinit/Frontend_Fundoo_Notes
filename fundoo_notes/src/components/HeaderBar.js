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
import { useSelector, useDispatch } from "react-redux"; // Import hooks from React-Redux
import {
  setSelectedTab,
  setLayoutType,
  layoutType,
  setSearchQuery,
  searchQuery,
} from "../redux/homeSlice"; // Import actions

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
  // layoutType,
  // setLayoutType,
  // searchQuery,
  // setSearchQuery,
}) => {
  const dispatch = useDispatch();
  const layoutType = useSelector((state) => state.home.layoutType);
  const searchQuery = useSelector((state) => state.home.searchQuery);

  // const toggleLayout = () => {
  //   dispatch(
  //     setLayoutType((prevType) => (prevType === "grid" ? "list" : "grid")),
  //     console.log("layoutType", layoutType)
  //   );
  //   // setLayoutType((prevType) => (prevType === "grid" ? "list" : "grid"));
  // };

  const currentLayoutType = useSelector((state) => state.home.layoutType);
  const toggleLayout = (currentLayout) => {
    return currentLayout === "grid" ? "list" : "grid";
  };

  // In your component
  const handleToggleLayout = () => {
    const newLayoutType = toggleLayout(currentLayoutType);
    dispatch(setLayoutType(newLayoutType)); // Only dispatch the new layout type, not a function
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    console.log("Querr", searchQuery);
    // setSearchQuery(e.target.value);
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
          <Heading sx={{ display: { xs: "none", sm: "block" } }}>Keep</Heading>
        </Box>
        <Box>
          <TextField
            variant="outlined"
            placeholder="Search"
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              height: "50px",
              width: {
                xs: "150px",
                sm: "250px",
                md: "450px",
                lg: "600px",
                xl: "600px",
              },
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <IconButton onClick={handleToggleLayout}>
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
          <IconButton>
            <AccountCircle fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
