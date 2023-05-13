import {useNavigate, useParams} from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import DeleteIcon from '@mui/icons-material/Delete';
import {Viewer} from '@toast-ui/react-editor';
import {Button, Divider, Paper, Stack, Typography} from "@mui/material";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function TilContentViewer() {
  // const {a} = useLoaderData(); 이런식으로 객체를 받게하면 해당하는 data만 받오기에 변수지정해줘야한다.
  // const til_data = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();
  const authInfo = useSelector(state => state.login)
  const accesstoken = authInfo.access_token;
  // console.log(params)

  const [til_data, setTileContent] = useState({
    content: {}
  });

  useEffect(() => {
    fetch(`/til/${params.til_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accesstoken}`
      },
    }).then(response => {
      return response.json();
    }).then(result => {
      // console.log(result)
      setTileContent({
        content: result
      })
      // console.log(til_data)
    })
    .catch(error => console.log(error))
  }, [])

  const deleteContent = (id) => {
    fetch(`/til/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accesstoken}`
      }
    }).then(response => {
      if (response.status == 200) {
        navigate("/TIL")
      } else if (response.status === 403) {
        throw new Error("접근 범위가 아닙니다.")
      } else if (response.status === 500) {
        throw new Error("서버 관리자에게 문의 해주세요")
      }
    }).catch(error => console.log(error.toLocaleString()))
  }

  // 로더로 받아온 데이터를 state형태로 전달할수있다.
  const modifyEvent = (tilData) => {
    // state객체로 location에게 정보를 전달가능
    navigate("/TIL/Edit", {state: tilData})
  }

  return (
      <>
        <Paper sx={{
          minHeight: "600px",
          padding: "30px",
          backgroundColor: "#FFF4EF"
        }} variant={"elevation"} elevation={10}>
          <Typography variant={"h6"}>{til_data.content.tuiTitle}</Typography>
          <Divider></Divider>
          {
              til_data.content.tuiContent && <Viewer
                  initialValue={til_data.content.tuiContent}/>
          }
          <Divider></Divider>
        </Paper>
        <Stack>
          <Stack justifyContent={"left"} sx={{
            paddingRight: 0,
            marginTop : 2,
            position:"absolute"
          }}>
            <Button variant="contained"
                    onClick={() => {
                      navigate("/TIL")
                    }
                    }
                    color={"primary"} startIcon={<ReplyIcon/>}
                    sx={{width: 90}}
            >
              이전
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={"right"}
                 sx={{marginTop:2}}
          >

            <Button variant="contained"
                    onClick={() => deleteContent(til_data.content.tuiId)}
                    startIcon={<DeleteIcon/>}
                    color={"error"}
            >
              삭제
            </Button>
            <Button variant="contained"
                    onClick={() => modifyEvent(til_data.content)}
                    color={"warning"} startIcon={<NoteAltIcon/>}
            >
              수정
            </Button>
          </Stack>
        </Stack>
      </>
  )
}