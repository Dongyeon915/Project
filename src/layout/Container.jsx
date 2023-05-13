import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from "./AppBar/MyAppBar";
import MyDrawer from "./Drawer/MyResponsiveDrawer";
import ContentContainer from "./ContentContainer";
import Grid2 from "@mui/material/Unstable_Grid2";


function Container() {

  //  content 영역
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
      <Grid2 sx={{display: 'flex', backgroundColor: "#F3EED9",minHeight:1000}}>
        <CssBaseline/>
        <MyAppBar handleDrawerToggle={handleDrawerToggle}/>
        <MyDrawer handleDrawerToggle={handleDrawerToggle}
                  mobileOpen={mobileOpen}/>
        <ContentContainer/>
      </Grid2>
  );
}

export default Container;
