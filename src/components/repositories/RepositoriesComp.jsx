import {
  Button,
  Card,
  CardContent, Container,
  Link,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import repositoryWebhooks from "./repositoryWebhooks";
import Grid2 from "@mui/material/Unstable_Grid2";
import {GitHub} from "@mui/icons-material";
import Box from "@mui/material/Box";

function repositoriesComp() {
  return (
    <Container fixed={"true"}>
      <Typography variant={"h4"} fontWeight={"bolder"} marginTop={3} textAlign={"center"} sx={{fontFamily:"Oswald"}}>
        <GitHub sx={{marginRight:3}} fontSize={"large"} />
        My Git Repositories
      </Typography>
      <Grid2 marginTop={2} justifyContent={"center"} padding={1} spacing={1}  container={true}  direction={"row"}>
        {repositoryWebhooks.map((repository, index) => {
          return (
              <Box elevation={3}  sx={{width:"50%",padding:2,backgroundColor:"#F3EED9"}}>
                <Card sx={{marginTop: 1}}>
                  <CardContent>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Link
                          href={repository.html_url2}
                          sx={{textDecoration: "none", color: "#333333"}}
                      >
                        <Typography variant={"body1"} fontWeight={"bolder"} sx={{fontFamily:"Oswald"}}>
                          <GitHub sx={{marginRight: 2}}/>
                          {repository.name}
                        </Typography>
                      </Link>
                      {/*<Typography variant={"body2"}>*/}
                      {/*  업데이트 :*/}
                      {/*  {repository.updated_at}*/}
                      {/*</Typography>*/}
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack direction={"row"} marginTop={2} marginLeft={5}>
                        <Typography variant={"body2"} color={"#333333"} sx={{fontFamily:"Oswald"}}>
                          Language : {repository.language}
                        </Typography>

                      </Stack>
                      <Grid2>
                        <Link
                            href={repository.html_url2}>
                        <Button variant="outlined"
                                size={"small"}>show Commits</Button>
                        </Link>
                      </Grid2>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
          )
        })}
      </Grid2>
      </Container>
  )
}

export default repositoriesComp