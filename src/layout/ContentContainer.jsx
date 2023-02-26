import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function ContentContainer() {
  return (
      <Box component="main" sx={{flexGrow: 1, p: 3, width: {sm: 'calc(100% - 240px)'}}}>
        <Toolbar/>
        <Typography paragraph>
          This is Content Area
        </Typography>
      </Box>
  )
}

export default ContentContainer
