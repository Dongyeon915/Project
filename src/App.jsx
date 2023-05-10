import * as React from 'react';
import {Route, Routes} from "react-router-dom";
import Container from "./layout/Container";
import OverviewComp from "./components/overview-comp/OverviewComp";
import LoginComp from "./components/login/LoginComp";
import PrivateRoutes from "./router/PrivateRoutes";
import RepositoriesComp from "./components/repositories/RepositoriesComp";
import TodayComp from "./components/today/TodayComp";
import Total from "./components/my-total/Total";
import ToastComp from "./components/toast/ToastComp";
import TilContentWriter from "./components/toast/TilContentWriter";
import TilContentViewer from "./components/toast/TilContentViewer";
import LoginHandlerComp from "./components/login/LoginHandlerComp";

function App() {

  return (
      <Routes>
        <Route element={<Container/>}>
          <Route index element={<LoginComp/>}/>
          <Route path={"/login"} element={<LoginComp/>}/>
          <Route path={"/oauth2/access_token/:access_token/refresh_token/:refresh_token"} element={<LoginHandlerComp/>}/>
        </Route>
        <Route element={<PrivateRoutes/>}>
          <Route element={<Container/>}>
            <Route path={"/overview"} element={<OverviewComp/>}/>
            <Route path={"/repository"} element={<RepositoriesComp/>}/>
            <Route path={"/today"} element={<TodayComp/>}/>
            <Route path={"/total"} element={<Total/>}/>
            <Route path={"/TIL"} element={<ToastComp/>}/>
            <Route path={"/TIL/Write"} element={<TilContentWriter/>}/>
            <Route path={"/TIL/Edit"} element={<TilContentWriter/>}/>
            <Route path={"/TIL/Contents/:til_id"} element={<TilContentViewer/>}/>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
