import {Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {myRequestGenerator} from "../../helper/helper";
import {useDispatch, useSelector} from "react-redux";
import {getLoginInfoAction} from "../../redux/actions/loginAction";

export default function LoginHandlerComp() {

  const params = useParams();
  const navigate = useNavigate();

  // 동연
  const login = useSelector(state => state.login)
  const dispatch = useDispatch();


  useEffect(() => {
    // console.log(params)
    // console.log(params.access_token)
    // console.log(params.refresh_token)
    localStorage.setItem("access_token", params.access_token)
    localStorage.setItem("refresh_token", params.refresh_token)

    // 동연
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    // console.log("저장되는지 확인" + refresh_token);
    // console.log("저장되는지 확인" + accesstoken);

    // fetch(myRequestGenerator(`/`),{
    //   method:"POST",
    //   headers: {
    //     Authentication: `Bearer ${accesstoken}`
    //   },}).then(response => response.json()).then(user => {
    //     console.log("유저확인" + user)
    //     dispatch(getLoginInfoAction(user.access_token,user.refresh_token))
    // }).catch(error => {
    //   console.log(error)
    // })
    dispatch(getLoginInfoAction(params.access_token ,params.refresh_token));
    navigate("/overview")
  },[])


  return (
      <Container maxWidth="false">
        <Grid container xs={12} lg={12}>
          <Grid container xs={12} lg={12}>
            <Grid xs={12} lg={6}>
              <p>Login Success</p>
              <p>{params.refresh_token}</p>
              <p>{params.access_token}</p>
            </Grid>
          </Grid>
        </Grid>
      </Container>
  )
}
