import '@toast-ui/editor/dist/toastui-editor.css';
import React, {useEffect, useRef, useState} from "react"
import {Editor} from '@toast-ui/react-editor';
import {myRequestGenerator} from "../../helper/helper";
import {TextField} from "@mui/material";
import {response} from "../../sample/Complete";
import {useNavigate} from "react-router-dom";

export default function MyComponent() {

  const [state, setState] = useState({content: ''})
  const titleRef = useRef()
  const editorRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
  }, [])

  const handleClick = () => {
    fetch(myRequestGenerator(`/til`),{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        tuiId: null,
        tuiTitle: titleRef.current.value,
        tuiContent: editorRef.current.getInstance().getMarkdown(),
        type:"html",
        createDate: new Date().toISOString().split("T")[0]
      })
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

  return (
        <>
          <TextField sx={{width : "100%"}} inputRef={titleRef}/>
          <Editor
              previewStyle="vertical"
              height="400px"
              initialEditType="markdown"
              initialValue={state.content}
              ref={editorRef}
              onChange={changeContent}
              placeholder="Write Content Here!"
          />
          <button onClick={handleClick}>등록</button>
        </>
    );
}