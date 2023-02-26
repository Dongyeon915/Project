import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import RepositoriesComp from "../components/repositories/RepositoriesComp";
import {BrowserRouter, Route} from "react-router-dom";

function ContentContainer() {
  return (
      <Box component="main"
           sx={{flexGrow: 1, p: 3, width: {sm: 'calc(100% - 240px)'}}}>
        <Toolbar/>
      <BrowserRouter>
        {/*<Route path={"/"} exact component={<RepositoriesComp/>}></Route>*/}
        <RepositoriesComp/>
      </BrowserRouter>
      </Box>
  )
}

export default ContentContainer
