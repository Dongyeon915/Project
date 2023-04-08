import {
  Button,
  Container,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import JavascriptIcon from '@mui/icons-material/Javascript';
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
// 라우터링크로 component를 지정해줘야
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {myRequestGenerator} from "../../helper/helper";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function ToastComp() {

  const [state, setState] = useState({
    "contents": [],
  })

  const navigate = useNavigate();

  // 글쓰기를 누르면 navigate가 redirect해준다
  const writeClickHandler = useCallback(e => {
    navigate("/TIL/Write")
  }, []);

  useEffect(() => {
    fetch(myRequestGenerator(`/til`), {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(response => response.json())
    .then(til => {
      console.log(til)
      setState(prevState => {
        return {
          contents: til
        }
      })
    }).catch(error => console.log(error))
  }, [])

  return (
      <Container fixed={"true"} sx={{borderRadius: 8}}>
        <Grid2 container={"true"} lg={12} spacing={2}>
          <Grid2 lg={12}>
            <Typography variant={"h4"} fontWeight={"bolder"} marginTop={3}
                        textAlign={"left"}>
              Today I Learned
            </Typography>
          </Grid2>
          <Grid2 lg={12}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead sx={{"backgroundColor": "#6A8A87"}}>
                  <TableRow>
                    <TableCell align="center">No.</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Type</TableCell>
                    <TableCell align="center">Created by</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.contents.map((content, index) => (
                      <TableRow
                          key={index}
                          sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">
                          <Link
                              underline={"none"}
                              component={RouterLink}
                              to={`/TIL/${content.tuiId}`}
                          >
                            {content.tuiTitle}
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Box>
                            {content.type}
                          </Box>
                        </TableCell>
                        <TableCell
                            align="center">{content.createDate}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
        </Grid2>
        <Grid2 container={"true"} justifyContent={"flex-end"} paddingRight={2} paddingTop={3}>
          <Button variant="contained"
                  color={"success"}
                  startIcon={<ModeEditIcon/>} onClick={writeClickHandler}>
            글쓰기
          </Button>
        </Grid2>
      </Container>
  )
}