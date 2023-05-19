import {Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLoginInfoAction} from "../../redux/actions/loginAction";
import jwt_decode from "jwt-decode";

export default function LoginHandlerComp() {

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(params)
    // console.log(params.access_token)
    // console.log(params.refresh_token)
    localStorage.setItem("access_token", params.access_token)
    localStorage.setItem("refresh_token", params.refresh_token)

    const userInfo = jwt_decode(params.access_token);

    dispatch(getLoginInfoAction(params.access_token ,params.refresh_token, userInfo));
    // console.log(userInfo)
    navigate("/overview")
  },[])


  return (
      <Container maxWidth="false">
        <Grid container xs={12} lg={12}>
          <Grid container xs={12} lg={12}>
            <Grid xs={12} lg={6}>
              <p>Login Success</p>
              {/*<p>{params.refresh_token}</p>*/}
              {/*<p>{params.access_token}</p>*/}
            </Grid>
          </Grid>
        </Grid>
      </Container>
  )
}
