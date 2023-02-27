import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import RepositoriesComp from "../components/repositories/RepositoriesComp";
import Grid2 from "@mui/material/Unstable_Grid2";

function ContentContainer() {
  return (
      <Grid2 component="main"
           sx={{flexGrow: 1, p: 3, width: {sm: 'calc(100% - 240px)'}}}>
        <Toolbar/>
          <RepositoriesComp/>
      </Grid2>
  )
}

export default ContentContainer
