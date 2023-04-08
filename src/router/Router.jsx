import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import OverviewComp from "../components/overview-comp/OverviewComp";
import RepositoriesComp from "../components/repositories/RepositoriesComp";
import Schedule from "../components/Schedule";
import TodayComp from "../components/today/TodayComp";
import Total from "../components/my-total/Total";
import TodoComp from "../components/today/todos/TodoComp";

// ------------------------------------ 여러개를 받아올수 있으므로 as지정
import ToastComp, {loader as TIL_Loader} from "../components/toast/ToastComp";
import TilContentViewer, {loader as TIL_LOADER} from "../components/toast/TilContentViewer";
import TilContentWriter, {
  TILContentLoader
} from "../components/toast/TilContentWriter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <OverviewComp/>
      },
      {
        path: "/overview",
        element: <OverviewComp/>
      },
      {
        path: "/repository",
        element: <RepositoriesComp/>
      },
      {
        path: "/timer",
        element: <Schedule/>
      },
      {
        path: "/today",
        element: <TodayComp/>
      },
      {
        path: "/total",
        element: <Total/>
      },
      {
        path: "/TIL",
        element: <ToastComp/>
      },
      {
        path: "/TIL/Write",
        element: <TilContentWriter/>,
      },
      {
        path: "/TIL/Edit",
        element: <TilContentWriter/>,
      },
      {
        path: "/TIL/:til_id",
        element: <TilContentViewer/>,
        loader: TIL_LOADER,
      }
    ]
  }
], {
  basename: `${process.env.PUBLIC_URL}`
});
