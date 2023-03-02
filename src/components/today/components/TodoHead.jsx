import {Stack, Typography} from "@mui/material";

export default function TodoHead() {
  return (
      <Stack direction={"row"} justifyContent={"space-between"}
             alignItems={"center"}>
        <Typography variant={"h6"} fontWeight={700}>Todo
          List</Typography>
        <Typography variant={"subtitle2"}
                    fontWeight={600}>{new Date().toLocaleDateString()}</Typography>
      </Stack>
  )
}