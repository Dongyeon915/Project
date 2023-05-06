import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Outlet} from "react-router-dom";

function ContentContainer() {

  return (
      <Grid2 component="main"
             sx={{flexGrow: 1, p: 3, width: {sm: 'calc(100% - 240px)'}}}>
        <Toolbar/>
        {/* 실제 component 위치 */}
        <Outlet/>
      </Grid2>
  )
}

export default ContentContainer
