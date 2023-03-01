import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Checkbox,
  Divider, IconButton,
  Input,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";


export default function TodayCompCopy() {



  return (
      
      // todo title 및 날짜
      <Grid2 lg={6}>
        <Paper variant={"elevation"} elevation={4} sx={{padding: 3}}>
          <Stack direction={"row"} justifyContent={"space-between"}
                 alignItems={"center"}>
            <Typography variant={"h6"} fontWeight={700}>Todo
              List</Typography>
            <Typography variant={"subtitle2"}
                        fontWeight={600}>{new Date().toLocaleDateString()}</Typography>
          </Stack>
          <Divider sx={{marginTop: 1, backgroundColor: "black",}}/>



          {/*over flowY시 박스 사이즈 초과해도 mxaHeight안에서 스크롤 바가 생긴다*/}
          {/*todo 항목*/}
          <Stack flexGrow={1} minHeight={320} maxHeight={320}
                 sx={{marginTop: 2, marginBottom: 2, overflowY: "auto"}}>
            <Paper variant={"outlined"} elevation={"4"} sx={{padding: 2,display:"flex",alignItems:"center"}}>
              <Checkbox/>
              <Typography color={"#333333"} fontWeight={700}>
              </Typography>
            </Paper>
          </Stack>

          
          
          {/*todo input*/}
          <Stack direction={"row"} alignItems={"center"} sx={{
            backgroundColor: "#666666",
            borderRadius: 10,
            padding: '3px 20px'
          }}>
            {/*flexGrow 사용시 남은 여백만큼 위치 차지함*/}
            <Input placeholder={"New Task..."}
                   sx={{flexGrow: 1, color: "white"}}
            />
            <IconButton>
              <TaskAltIcon sx={{color: "white"}} fontSize={"medium"}/>
            </IconButton>
          </Stack>

        </Paper>
      </Grid2>
  )
}