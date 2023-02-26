import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import OverviewComp from "../components/overview-comp/OverviewComp";

function ContentContainer() {
  return (
      <Box component="main" sx={{flexGrow: 1, p: 3, width: {sm: 'calc(100% - 240px)'}}}>
        <Toolbar/>
        <OverviewComp/>
      </Box>
  )
}

export default ContentContainer
