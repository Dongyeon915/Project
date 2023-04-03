import '@toast-ui/editor/dist/toastui-editor.css';
import React from "react"
import { Editor } from '@toast-ui/react-editor';
import * as state from "react-dom/test-utils";
import PomodoroCopy from "../../sample/Example/PomodoroCopy";
import {myRequestGenerator} from "../../helper/helper";
import {response} from "../../sample/Complete";

export default class MyComponent extends React.Component {

  // eslint-disable-next-line no-undef
  editorRef = React.createRef();


  constructor(props) {
    super(props);
    this.state = {
      content : ``
    }
  }


  handleClick = () => {
    fetch(myRequestGenerator(`/tui`),{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        tuiValue:this.state.content
      })
    }).then(response => {
      console.log(response)
    })
  };


  changeContent = () => {
    const content = this.editorRef.current.getInstance().getMarkdown();
    this.setState({
      content:content
    })
  };

  render() {
    console.log(this.state.content)
    return (
        <>
          <Editor
              previewStyle="vertical"
              height="400px"
              initialEditType="markdown"
              initialValue={this.state.content.value}
              ref={this.editorRef}
              onChange={this.changeContent}
              placeholder={this.state.content.value}
          />
          <button onClick={this.handleClick}>전송가자</button>
        </>
    );
  }
}