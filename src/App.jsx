import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from "./layout/AppBar/MyAppBar";
import MyDrawer from "./layout/Drawer/MyResponsiveDrawer";
import ContentContainer from "./layout/ContentContainer";
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "@mui/material";
import testComp from "./rout-test/testComp";
import testComp2 from "./rout-test/testComp2";
function App() {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>
          <MyAppBar handleDrawerToggle={handleDrawerToggle}/>
          <MyDrawer handleDrawerToggle={handleDrawerToggle}
                    mobileOpen={mobileOpen}/>
          <ContentContainer/>
        </Box>
  );
}

export default App;
