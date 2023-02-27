import {
  Button,
  Card,
  CardContent, Container,
  Link,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import repositoryWebhooks from "./RepositoryWebhooks";
import Grid2 from "@mui/material/Unstable_Grid2";
import {GitHub} from "@mui/icons-material";

function repositoriesComp() {
  return (
    <Container fixed={"true"}>
        {repositoryWebhooks.map((repository, index) => {
          return (
              <Paper elevation={3}>
                <Card sx={{marginTop: 2}}>
                  <CardContent>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Link
                          href={repository.html_url2}
                          sx={{textDecoration: "none", color: "#333333"}}
                      >
                        <Typography variant={"body1"} fontWeight={"bolder"}>
                          <GitHub sx={{marginRight: 2}}/>
                          {repository.name}
                        </Typography>
                      </Link>
                      <Typography variant={"body2"}>
                        업데이트 :
                        {repository.updated_at}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack direction={"row"} marginTop={2} marginLeft={5}>
                        <Typography variant={"body2"} color={"#333333"}>
                          Language : {repository.language}
                        </Typography>

                      </Stack>
                      <Grid2>
                        <Button variant="outlined"
                                size={"small"}>show Commits</Button>
                      </Grid2>
                    </Stack>
                  </CardContent>
                </Card>
              </Paper>
          )
        })}
      </Container>
  )
}

export default repositoriesComp