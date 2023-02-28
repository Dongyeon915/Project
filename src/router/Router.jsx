import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import OverviewComp from "../components/overview-comp/OverviewComp";
import RepositoriesComp from "../components/repositories/RepositoriesComp";
import Schedule from "../components/Schedule";
import TodayComp from "../components/today/TodayComp";


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
      }
    ]
  }
], {
  basename: `${process.env.PUBLIC_URL}`
});
