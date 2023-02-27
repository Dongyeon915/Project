import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import RepositoriesComp from "../components/repositories/RepositoriesComp";
import Grid2 from "@mui/material/Unstable_Grid2";
import ComitComp from "../components/repositories/commit/ComitComp";

function ContentContainer() {
  return (
      <Grid2 component="main"
           sx={{flexGrow: 1, p: 3, width: {sm: 'calc(100% - 240px)'}}}>
        <Toolbar/>
        <Grid2 container={true} spacing={2}>
          <RepositoriesComp/>
          <ComitComp/>
        </Grid2>
      </Grid2>
  )
}

export default ContentContainer
