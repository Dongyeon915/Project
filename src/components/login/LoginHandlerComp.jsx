import {Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function LoginHandlerComp() {

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params)
    console.log(params.access_token)
    console.log(params.refresh_token)
    localStorage.setItem("access_token", params.access_token)
    localStorage.setItem("refresh_token", params.refresh_token)
    // redux
    // {
    //   isAuthenticated: true,
    //   access_token: "********",
    //   refresh_token: "********"
    // }
    //
    //
    navigate("/overview")
  })

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
