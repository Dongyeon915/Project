import {Card, CardContent, Link, Paper, Stack, Typography} from "@mui/material";
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

                    <Typography>
                      {repositoryWebhooks.name}
                    </Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Link
                          href={"https://github.com/Dongyeon915?tab=overview&from=2023-01-01&to=2023-01-31"}
                          sx={{textDecoration: "none", color: "#333333"}}
                      >
                          <Typography variant={"h6"}>
                            <GitHub sx={{marginRight:2}}/>
                            {repository.rePoInfo}
                          </Typography>
                      </Link>
                      <Typography variant={"body2"}>
                        업데이트 :
                        {repository.updated_at}
                      </Typography>
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