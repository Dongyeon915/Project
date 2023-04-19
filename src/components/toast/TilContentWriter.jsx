import '@toast-ui/editor/dist/toastui-editor.css';
import React, {useEffect, useRef, useState} from "react"
import {Editor} from '@toast-ui/react-editor';
import {myRequestGenerator} from "../../helper/helper";
import {Button, Stack, TextField} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

export default function TilContentWriter() {

  const [state, setState] = useState({content: ''})
  const titleRef = useRef()
  const editorRef = useRef()
  const typeRef = useRef()
  const navigate = useNavigate()
  const location = useLocation();
  let tuiContent = {};
  let btnTitle = "등록"
  if (location.pathname === "/TIL/Edit") {
    // navigate 정보
    tuiContent = location.state
    btnTitle = "수정"
  } else {
    tuiContent = {
      tuiTitle: "",
      tuiContent: ""
    }
  }

  useEffect(() => {
    if (tuiContent.tuiTitle) {
      titleRef.current.value = tuiContent.tuiTitle
    }
  }, [])

  const handleClick = () => {
    let requestMethod = "";
    let requestPath = "";
    let bodyData = {
      tuiId: null,
      tuiTitle: titleRef.current.value,
      tuiContent: editorRef.current.getInstance().getMarkdown(),
      type: typeRef.current.value,
      createDate: new Date().toISOString().split("T")[0],
      updateDate: new Date().toISOString().split("T")[0]
    }

    if (location.pathname === "/TIL/Edit") {
      requestPath = myRequestGenerator(`/til`)
      bodyData.tuiId = tuiContent.tuiId;
      bodyData.createDate = tuiContent.createDate;
      requestMethod = "PUT"
    } else {
      requestPath = myRequestGenerator(`/til`)
      requestMethod = "POST"
    }

    fetch(requestPath, {
      method: requestMethod,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData)
    }).then(response => {
      // 처음 성공 실패 여부를 확인
      if (response.status == 200) {
        return response.json()
      }
      return null;
    })
    .then(res => {
      if (res == null) {
        console.log("[ERR2037]")
      } else {
        navigate(`/TIL/${res}`)
      }
    })
  };

  const changeContent = () => {
    setState({
      content: editorRef.current.getInstance().getMarkdown()
    })
  };



  // 타이틀과 타입이 공란이라면 알려준다 back서버도 @size를 적용해둿음
  const enterEventHandler = (e) => {
    if (titleRef.current.value.length == 0) {
      alert("TITLE을 입력해주세요")
    }if (typeRef.current.value.length == 0){
      alert("TYPE을 입력해주세요")
    }
  }

  return (
      <>
        <Stack direction={"row"}>
          <TextField label={"TITLE"} placeholder={"1글자 이상을 입력해주세요"} sx={{width: "40%",backgroundColor:"white"}}
                     inputRef={titleRef}

          />
          <TextField label={"TYPE"} placeholder={"1글자 이상을 입력해주세요"} sx={{width: "30%",backgroundColor:"white"}}
                     inputRef={typeRef}/>
        </Stack>
        <Editor
            previewStyle="vertical"
            height="400px"
            initialEditType="markdown"
            initialValue={tuiContent.tuiContent}
            ref={editorRef}
            onChange={changeContent}
            placeholder="Write Content Here!"
        />
        <Stack justifyContent={"end"} marginTop={2}>
          <Button variant="contained"
                  color={"info"}
                  startIcon={<FileDownloadDoneIcon/>} onClick={(e) => {handleClick();enterEventHandler(e);}}>
            {btnTitle}
          </Button>
        </Stack>
      </>
  );
}