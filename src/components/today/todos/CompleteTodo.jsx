import Grid2 from "@mui/material/Unstable_Grid2";
import {Stack, Typography} from "@mui/material";

export function CompleteTodo({todo}) {
  return (
      <Grid2 direction={"row"}>
        <Stack direction={"row"} spacing={18}
               sx={{size: "smoll"}}
               alignItems={"center"}
        >
          <Typography
              sx={{textDecoration: "line-through"}}>{todo.task}</Typography>
          <Stack direction={"row"} flexGrow={1}>
            <Stack direction={"row"} alignItems={"center"}
                   spacing={5}>
              <Typography>
                {todo.completeTime}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid2>
  )
}