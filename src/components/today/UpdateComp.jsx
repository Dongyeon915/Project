import {Box, Input, Paper, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";

export default function UpdateComp() {
  return (
      <Stack direction={"row"} alignItems={"center"}
             justifyContent={"space-between"} flexGrow={1}
             position={"absolute"}
             zIndex={1000}
      >
        <Paper sx={{minWidth:400,position : "absolute"}} >
          <Typography variant={"h5"} flexGrow={1}>
            Edit
          </Typography>
          <Divider/>
          <Input placeholder={"수정할 내용을 입력해주세요."} sx={{minWidth:400}}/>
        </Paper>
      </Stack>
  )
}