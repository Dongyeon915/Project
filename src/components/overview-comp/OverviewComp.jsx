import {
  Card,
  CardContent,
  Container,
  Link,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import repositoryWebhooks from "./RepositoryWebhooks";

function overviewComp() {
  return (
      <Container>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Typography>
                {repositoryWebhooks.name}
              </Typography>
              <Link
                  href={"https://github.com/Dongyeon915?tab=overview&from=2023-01-01&to=2023-01-31"}
                  sx={{textDecoration: "none", color: "#333333"}}
              >
              </Link>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant={"body2"}>
                  {repositoryWebhooks.rePoInfo}
                </Typography>
                <Typography variant={"body2"}>
                  업데이트 :
                  {repositoryWebhooks.updated_at}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Paper>
      </Container>
  )
}

export default overviewComp