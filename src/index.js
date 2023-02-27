import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "@mui/material";
import testComp from "./rout-test/testComp";
import testComp2 from "./rout-test/testComp2";
import ContentContainer from "./layout/ContentContainer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <React.StrictMode>
      <App/>
      {/*<Switch>*/}
        {/*<Route path="/"><ContentContainer/></Route>*/}
        {/*<Route path={"/test2"}><testComp2/></Route>*/}
      {/*</Switch>*/}
    </React.StrictMode>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
