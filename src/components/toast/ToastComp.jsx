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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Divider from "@mui/material/Divider";
import {useDispatch, useSelector} from "react-redux";

export default function ToastComp() {

  const till = useSelector(state => state.til)
  const dispatch = useDispatch()
  const authInfo = useSelector(state => state.login)

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
  const [statePageNo, setPageNo] = useState({
    pageNo: 1
  })

  const accesstoken = authInfo.access_token;

  // 초기페이지 설정 1을 전달하면 offset이 1을 받음
  useEffect(() => {
    fetch(`/til/page/0`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accesstoken}`
      },
    }).then(response => {
      if (response.status === 401) {
        throw new Error("Token 인증에 실패하였습니다.")
      } else if (response.status === 403) {
        throw new Error("접근 범위가 아닙니다.")
      } else if (response.status === 500) {
        throw new Error("서버 관리자에게 문의 해주세요")
      }
      return response.json()})
    .then(til => {
      setState(prevState => {
        return {
          ...prevState,
          contents: til
        }
      })
    }).catch(error => console.log("til페이지 오류 서버 관리자에게 문의 해주세요."))
  }, [])

  // 모든 정보를 가져와 동적으로 페이지 숫자를 표시함
  useEffect(() => {
    fetch(`/til`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accesstoken}`
      },
    }).then(response => {
      if (response.status === 401) {
        throw new Error("Token 인증에 실패하였습니다.")
      } else if (response.status === 403) {
        throw new Error("접근 범위가 아닙니다.")
      } else if (response.status === 500) {
        throw new Error("서버 관리자에게 문의 해주세요")
      }
      return response.json()
    })
    .then(til => {
      const newTil = til.length / 10
      // console.log(Math.floor(newTil))
      setPageLength(prevState => {
        return {
          ...prevState,
          pageValue: Math.floor(newTil)
        }
      })
    }).catch(error => {
      console.log(error.toLocaleString());
    })
  }, [])

  // 페이지 만들기
  const handleChange = (event, value) => {
    setPageNo(prevState => {
      // 만약 value의 값이 1이라면 기존 페이지에 value값을 전달
      if (value == 1) {
        return {
          ...prevState,
          pageNo: value
        }
      }
      return {
        ...prevState,
        pageNo: value * 10 - 9
      }
    })
    // 0부터 전달해줘야 offset을 실행할때 0번째 인덱스의 정보부터 불러오며 0~1이 아닌이상은 10을 곱해서 끊어줘야한다
    if (value == 1) {
      var newValue = 0
    } else {
      var newValue = value * 10
    }
    fetch(`/til/page/${newValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accesstoken}`
      },
    }).then(response => {
      if (response.status === 401) {
        throw new Error("Token 인증에 실패하였습니다.")
      } else if (response.status === 403) {
        throw new Error("접근 범위가 아닙니다.")
      } else if (response.status === 500) {
        throw new Error("서버 관리자에게 문의 해주세요")
      }
      return response.json()})
    .then(til => {

          setState(prevState => {
            return {
              contents: til
            }
          })
        }
    )
    .catch(error => console.log(error.toLocaleString()))
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
                              to={`/TIL/Contents/${content.tuiId}`}
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

