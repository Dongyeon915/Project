import {redirect, useLoaderData, useNavigate} from "react-router-dom";
import {myRequestGenerator} from "../../helper/helper";
import '@toast-ui/editor/dist/toastui-editor.css';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {Viewer} from '@toast-ui/react-editor';
import {Button, Divider, Paper, Stack, Typography} from "@mui/material";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import {deleteTodoActionCreator} from "../../redux/actions/todoAction";

// loder는 파라미터로 넘어온걸 받아준다
// async로 순서를 맞춰줘야한다
export async function loader({params}) {
  const content = await getTILContentByID(params.til_id)
  // content : content 생략시 담김
  return {content};
}

function getTILContentByID(id) {
  return fetch(myRequestGenerator(`/til/${id}`), {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  }).then(response => {
    return response.json();
  })
  .catch(error => console.log(error))
}

export default function TilContentViewer() {
  // const {a} = useLoaderData(); 이런식으로 객체를 받게하면 해당하는 data만 받오기에 변수지정해줘야한다.
  const til_data = useLoaderData();
  const navigate = useNavigate();

  const deleteContent =  (id) => {
    fetch(myRequestGenerator(`/til/${id}`), {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    }).then(response => {
      if (response.status == 200) {
        console.log("삭제 성공")
        navigate("/TIL")
      }
    }).catch(error => console.log(error))
  }

  // 로더로 받아온 데이터를 state형태로 전달할수있다.
  const modifyEvent = (tilData) => {
    navigate("/TIL/Edit", {state: tilData})
  }

  return (
      <>
        <Paper sx={{minHeight: "600px", padding: "30px", backgroundColor: "#FFF4EF"}} variant={"elevation"} elevation={10}>
          <Typography variant={"h6"} >{til_data.content.tuiTitle}</Typography>
          <Divider></Divider>
          <Viewer initialValue={til_data.content.tuiContent}/>
          <Divider></Divider>
        </Paper>
        <Stack direction="row" spacing={2} justifyContent={"right"} marginTop={2}>
          <Button variant="contained" onClick={ () => deleteContent(til_data.content.tuiId)}
                  startIcon={<DeleteIcon/>}
                  color={"error"}
          >
            삭제
          </Button>
          <Button variant="contained" onClick={() => modifyEvent(til_data.content)}
            color={"warning"} startIcon={<NoteAltIcon/>}
          >
            수정
          </Button>
        </Stack>
      </>

  )
}