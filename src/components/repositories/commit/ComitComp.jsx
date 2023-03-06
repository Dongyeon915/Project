import {Box, Paper} from "@mui/material";
import gitProjectCommits from "./gitProjectCommits";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function comitComp() {
  return (
      <Box marginTop={2} lg={4}>
        {gitProjectCommits.map((project, index) => {
          return (
              <Paper elevation={3}>
              <List >
                <ListItem>
                  <ListItemText>
                    {project.commit.message}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {project.commit.committer.date}
                  </ListItemText>
                </ListItem>
              </List>
              </Paper>
          )
        })}
      </Box>
  )
}

export default comitComp