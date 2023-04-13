import {
  Button,
  Container,
  Link,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
// 라우터링크로 component를 지정해줘야
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {myRequestGenerator} from "../../helper/helper";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Divider from "@mui/material/Divider";

export default function ToastComp() {

  const [state, setState] = useState({
    "contents": []
  })

  const navigate = useNavigate();

  // 글쓰기를 누르면 navigate가 redirect해준다
  const writeClickHandler = useCallback(e => {
    navigate("/TIL/Write")
  }, []);

  // //////////////////////////////////////////////////
  const [page, setPage] = useState();
  const [statePageLength, setPageLength] = useState({
    pageValue: 1
  })
  // 게시글 인덱스 번호 말고 다르게 value를사용
  const [statePageNo,setPageNo] = useState({
    pageNo : 1
  })

  // 초기페이지 설정 1을 전달하면 offset이 1을 받음
  useEffect(() => {
    fetch(myRequestGenerator(`/til/page/1`), {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(response => response.json())
    .then(til => {
      console.log(til)
      setState(prevState => {
        return {
          ...prevState,
          contents: til
        }
      })
    }).catch(error => console.log(error))
  }, [])

  // 모든 정보를 가져와 동적으로 페이지 숫자를 표시함
  useEffect(() => {
    fetch(myRequestGenerator(`/til`), {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(response => response.json())
    .then(til => {
      const newTil = til.length / 10
      // console.log(Math.floor(newTil))
      setPageLength(prevState => {
        return {
          ...prevState,
          pageValue: Math.floor(newTil)
        }
      })
    }).catch(error => console.log(error))
  }, [])

  // 페이지 만들기
  const handleChange = (event, value) => {
    setPageNo(prevState => {
      // 만약 value의 값이 1이라면 기존 페이지에 value값을 전달
      if (value == 1){
        return {
          ...prevState,
          pageNo : value
        }
      }
      return {
        ...prevState,
        pageNo : value * 10
      }
    })
    const newValue = value * 10
    fetch(myRequestGenerator(`/til/page/${newValue}`), {
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
      console.log(value)

        }
    )
    .catch(error => console.log(error))
  };

  return (
      <Container fixed={"true"} sx={{borderRadius: 8}}>
        <Grid2 container={"true"} lg={12} spacing={2}>
          <Grid2 lg={12}>
            <Typography variant={"h4"} fontWeight={"bolder"} marginTop={3}
                        textAlign={"left"}
                        sx={{fontFamily: "Oswald"}}
            >
              Today I Learned
            </Typography>
          </Grid2>
          <Grid2 lg={12}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead sx={{"backgroundColor": "#6A8A87"}}>
                  <TableRow>
                    <TableCell sx={{fontFamily: "Oswald", fontSize: "20px"}}
                               align="center">No.</TableCell>
                    <TableCell sx={{fontFamily: "Oswald", fontSize: "20px"}}
                               align="center">Title</TableCell>
                    <TableCell sx={{fontFamily: "Oswald", fontSize: "20px"}}
                               align="center">Type</TableCell>
                    <TableCell sx={{fontFamily: "Oswald", fontSize: "20px"}}
                               align="center">Created by</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.contents.map((content, index) => (
                      <TableRow
                          key={index}
                          sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell align="center">
                          {index + statePageNo.pageNo}
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
        <Grid2 container={"true"} justifyContent={"flex-end"} paddingRight={2}
               paddingTop={3}>
          <Stack spacing={2} flexGrow={1} alignItems={"center"}>

            <Pagination
                count={statePageLength.pageValue}
                page={page}
                color="primary"
                onChange={handleChange}
            />
          </Stack>

          <Button variant="contained"
                  color={"success"}
                  startIcon={<ModeEditIcon/>} onClick={writeClickHandler}>
            글쓰기
          </Button>
        </Grid2>
        <Grid2 marginTop={10}>
          <Divider/>
          <Typography variant={"body1"}>
            Copyright 2023.(Sangmyung University) <b>JuYong Lee</b> All Rights
            Reserved
          </Typography>
        </Grid2>
      </Container>
  )
}

