import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardMedia,
  Container,
  Link,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import {Aod, GitHub, Mail} from "@mui/icons-material";
import {useLocation} from "react-router-dom";

function overviewComp() {



  return (
      <Container fixed={"true"}>
        <Grid2 container={"true"} spacing={3}>
          <Grid2>
            <Paper variant={3}>
              <Card sx={{minWidth: 270}}>
                <CardMedia
                    component={"img"}
                    image={"https://i.namu.wiki/s/d637c7f7a98eb9f5cb9ae7f8c6cba3ab8e422eed0dc78534beb2026d6a7285d34dc454374775ffb5235cf336640b04b2b0b6a26cfeef3488d1c11ae729c82ba86db7635951ed390646324f6eb8af0c0660d279f86042ad712603acaa040e8ff9017161ca7a9e94d01486206b3ce23079"}
                    sx={{height: 300, borderRadius: 8}}
                >
                </CardMedia>
              </Card>
            </Paper>
          </Grid2>
          <Grid2>
            <Typography variant={"h4"} fontWeight={"inherit"}  sx={{fontFamily:"Oswald"}}>
              kim
            </Typography>
            <Typography variant={"body2"} marginTop={2} sx={{fontFamily:"Oswald"}}>
              sksms
              <br/>
              한글
              <br/>
              이 영화는 이런 내 생각을 똑똑히 증명했다. 허풍처럼 들리는가? 글쎄,
              <br/>
              나는 살면서 절대로 과장을 해본 적이 없다.
              <br/>
              난 내 본업을 소중히 여기기 때문에 어디 가서 다른 배우들 찬사를 쉽게 하는 사람이 아니다
            </Typography>
            <Stack direction={"row"} spacing={2} marginTop={2}>
              <Mail/>
              <Typography>
                ehd9567@naver.com
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
                010-9567-0921
              </Typography>
            </Stack>
          </Grid2>
        </Grid2>
        {/* 하단 부분 */}
        {/*<img src="https://ghchart.rshah.org/juyonglee" />*/}
        <Container fixed={"true"} marginTop={2}>
        </Container>
      </Container>
  )
}

export default overviewComp