import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import {useRef, useState} from "react";
import {myRequestGenerator} from "../../helper/helper";

export default function LoginComp() {

  // 이미지접근
  // console.log(`${process.env.PUBLIC_URL}/kakao/kakao_login_large_narrow.png`)

  return (

      <Grid2 height={"70%"} container={"true"}
             justifyContent={"center"} padding={2}>
        <Stack padding={2} width={600}
               sx={{backgroundColor: "#47817F", borderRadius: 20}}
               alignItems={"center"}>
          <Typography variant={"h1"} color={"#F3EED9"} fontFamily={"Oswald"}>
            LOGIN
          </Typography>
          <Stack marginTop={3} alignItems={"center"}>
            <Typography sx={{marginTop: 5}} variant={"h4"} color={"black"}
                        fontFamily={"Oswald"}>
              KAKAO
            </Typography>

            <Grid2 marginTop={2}>
              <a href={`http://localhost:8080/oauth2/authorization/kakao`}>
                <img width={300} height={80}
                     src={`${process.env.PUBLIC_URL}/kakao/kakao_login_large_narrow.png`}/>
              </a>
            </Grid2>

            <Typography variant={"h4"} color={"black"} fontFamily={"Oswald"}
                        marginTop={5}>
              NAVER
            </Typography>
            <Grid2 marginTop={2}>
              < a href="http://localhost:8080/oauth2/authorization/naver">
                <img
                    width={300} height={80}
                    src={`${process.env.PUBLIC_URL}/naver/naverimg.png`}/>
              </a>
            </Grid2>
          </Stack>
        </Stack>

      </Grid2>
  )
}