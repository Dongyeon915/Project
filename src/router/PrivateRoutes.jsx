import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

export default function PrivateRoutes() {

  const loginInfo = useSelector(state => state.login);

  return (
      loginInfo.isAuthenticated? <Outlet/> : <Navigate to={"/login"}/>
  )
}
