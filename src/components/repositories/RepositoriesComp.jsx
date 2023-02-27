import {
  Box,
  Button,
  Card,
  CardContent,
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
      <Grid2>
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
                        <Typography variant={"body1"}>
                          <GitHub sx={{marginRight: 2}}/>
                          {repository.rePoInfo}
                        </Typography>
                      </Link>
                      <Typography variant={"body2"}>
                        업데이트 :
                        {repository.updated_at}
                      </Typography>
                    </Stack>



                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Grid2 padding={1}>
                          {repository.language}
                      </Grid2>
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

      </Grid2>
  )
}

export default repositoriesComp