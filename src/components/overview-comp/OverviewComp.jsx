import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardMedia,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import {Aod, GitHub, Mail} from "@mui/icons-material";
import {useSelector} from "react-redux";

function OverviewComp() {

  const userInfo = useSelector(state => state.login.userInfo);

  return (
      <Container fixed={"true"}>
        <Grid2 container={"true"} spacing={3} marginTop={5}>
          <Grid2>
            <Paper variant={3}>
              <Card sx={{minWidth: 270, backgroundColor: "#F3EED9"}}>
                <CardMedia
                    component={"img"}
                    image={userInfo.profile}
                    sx={{height: 300, borderRadius: 8}}
                >
                </CardMedia>
              </Card>
            </Paper>
          </Grid2>
          <Grid2>
            <Typography variant={"h3"} fontWeight={"inherit"}
                        sx={{fontFamily: "Oswald"}}>
              {userInfo.sub}
              <br/>
              <Divider/>
              <Typography variant={"h6"}>
                {/*반갑다 내가 김동연이다*/}
              </Typography>
            </Typography>
            <Stack direction={"row"} spacing={2} marginTop={15}>
              <Mail/>
              <Typography>
                {userInfo.email}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2} marginTop={2}>
              <GitHub/>
              <Link href={"https://github.com/Dongyeon915"}
                    sx={{textDecoration: "none"}}>
                <Typography>
                  Github
                </Typography>
              </Link>
            </Stack>
            <Stack direction={"row"} spacing={2} marginTop={2}>
              <Aod/>
              <Typography>
                010-1234-1111
              </Typography>
            </Stack>
          </Grid2>
        </Grid2>
        {/* 하단 부분 */}
        <Container fixed={"true"} marginTop={2}>
        </Container>
      </Container>
  )
}

export default OverviewComp