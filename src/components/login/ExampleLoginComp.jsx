// import Grid2 from "@mui/material/Unstable_Grid2";
// import Typography from "@mui/material/Typography";
// import {
//   Button,
//   FormControl,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   TextField
// } from "@mui/material";
// import Box from "@mui/material/Box";
// import CelebrationIcon from '@mui/icons-material/Celebration';
// import CheckIcon from '@mui/icons-material/Check';
// import {useEffect, useRef, useState} from "react";
// import {myRequestGenerator} from "../../helper/helper";
// import TagFacesIcon from '@mui/icons-material/TagFaces';
// import SentimentVeryDissatisfiedIcon
//   from '@mui/icons-material/SentimentVeryDissatisfied';
// import {Visibility, VisibilityOff} from "@mui/icons-material";
// import {useNavigate, useParams} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {getLoginInfoAction} from "../../redux/actions/loginAction";
//
// export default function LoginComp() {
//   const publicUrl = process.env.PUBLIC_URL;
//   const [showPassword, setShowPassword] = useState(false);
//
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//
//   const [disabledJoin, setDisabledJoin] = useState(true)
//
//
//
//
//   const [isDisplay, setIsDisplay] = useState('none')
//   // ------------------------------------------------------------------------------------------
//   // 이메일 정규식
//   const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
//
//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const passwordCheckRef = useRef()
//
//   // email state
//   const [emailState, setEmail] = useState({
//     emailValue: ''
//   })
//   // password
//   const [passwordState, setPassword] = useState({
//     password: '',
//     passwordValue: ''
//   })
//   // Check password
//   const [checkPasswordState, setCheckPassword] = useState({
//     checkPasswordValue: ''
//   })
//
//   // check Email
//   const [checkEmailState, setCheckEmail] = useState({
//         checkEmail: "이메일 형식이 아닙니다."
//       }
//   );
//
//   // email 입력시 value저장
//   const changEmailValueHandler = (e) => {
//     setEmail(prevState => {
//       return {
//         ...prevState,
//         emailValue: e.target.value
//       }
//     })
//   }
//   // pssword입력시
//   const changPasswordValueHandler = (e) => {
//     setPassword(prevState => {
//       return {
//         ...prevState,
//         passwordValue: e.target.value
//       }
//     })
//   }
//
//   // password 체크 값 세팅
//   const changPasswordCheckHandler = (e) => {
//     setCheckPassword(prevState => {
//       return {
//         ...prevState,
//         checkPasswordValue: e.target.value
//       }
//     })
//   }
//
//   // email정규식 확인
//   const emailHandler = (e) => {
//     setIsDisplay('visible')
//     const emailValue = emailRegEx.test(e.target.value);
//     if (emailValue === true) {
//       console.log(emailValue)
//       setCheckEmail(prevState => {
//         return {
//           ...prevState,
//           checkEmail: "이메일 형식에 맞습니다"
//         }
//       })
//     } else if (emailValue === false) {
//       setCheckEmail(prevState => {
//         return {
//           ...prevState,
//           checkEmail: "이메일 형식이 아닙니다."
//         }
//       })
//     }
//   }
//
//   // join 버튼 클릭스 DB회원 정보 입력
//   const joinEventHandler = () => {
//     fetch(myRequestGenerator("/join"), {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify({
//         userEmail: emailState.emailValue,
//         userPassword: passwordState.password,
//         joinDate: new Date().toISOString().split("T")[0],
//       })
//     }).then(response => {
//       // 상태 접근을위해 status로 접근 해줘야한다
//       if (response.status == 200) {
//         alert("My Schedule 가입을 환영합니다.")
//       } else if (response.status == 500) {
//         alert("Email,Password 중복 확인을 해주세요")
//       }
//       //   백엔드 서버를 닫으면 볼수있음
//     }).catch(error => {
//       alert("관리자에게 문의 해주세요.")
//     })
//   }
//
//   // email가입 중복확인
//   const checkEmailHandler = () => {
//     fetch(myRequestGenerator("/join/check"), {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify({
//         userEmail: emailState.emailValue
//       })
//     }).then(response => {
//       if (response.status == 200) {
//         setDisabledJoin(false)
//         alert("가입 가능한 이메일 입니다.")
//       } else if (response.status == 400) {
//         setDisabledJoin(true)
//         alert("이미 존재하는 email입니다.")
//       }
//     }).catch(error => {
//       alert("관리자에게 문의 해주세요.")
//     })
//   }
//
//   // 비밀번호 체크 이벤트 password check
//   const checkPasswordHandler = () => {
//     if (passwordState.passwordValue == checkPasswordState.checkPasswordValue) {
//       alert("같은 비밀번호 입니다")
//       setPassword(prevState => {
//         return {
//           ...prevState,
//           password: passwordState.passwordValue
//         }
//       })
//     } else {
//       alert("비밀번호가 같지 않습니다")
//     }
//   }
//
//   // 이미지접근
//   // console.log(`${process.env.PUBLIC_URL}/kakao/kakao_login_large_narrow.png`)
//
//   return (
//
//       <Grid2 height={"70%"} container={"true"}
//              justifyContent={"center"} padding={2}>
//         <Stack padding={2} width={600}
//                sx={{backgroundColor: "#47817F", borderRadius: 20}}
//                alignItems={"center"}>
//           <Typography variant={"h2"} color={"#F3EED9"} fontFamily={"Oswald"}>
//             LOGIN
//           </Typography>
//           <Stack marginTop={7} alignItems={"center"}>
//             <Typography variant={"h5"} color={"#F3EED9"} fontFamily={"Oswald"}>
//               Email
//             </Typography>
//
//             {/* email 부분*/}
//             <Box sx={{display: 'flex', alignItems: 'center'}}>
//
//               <TextField sx={{width: 350, marginLeft: 10}} onChange={(e) => {
//                 emailHandler(e);
//                 changEmailValueHandler(e);
//
//               }} ref={emailRef} color={"success"} label="email"
//                          variant="outlined"
//
//               />
//
//               {/* 하단 형식 */}
//             </Box>
//             {checkEmailState.checkEmail == "이메일 형식에 맞습니다" ? <Typography
//                     color={"blue"} variant={"body2"} marginRight={12}
//                     fontWeight={"bold"}
//                     display={isDisplay}
//                 >
//                   {checkEmailState.checkEmail}<TagFacesIcon fontSize={"small"}/>
//                 </Typography> :
//                 <Typography color={"darkred"} variant={"body2"}
//                             marginRight={12} fontWeight={"bold"}
//                             display={isDisplay}>
//                   {checkEmailState.checkEmail}<SentimentVeryDissatisfiedIcon
//                     fontSize={"small"}/>
//                 </Typography>}
//
//             {/*password 부분*/}
//             <Typography variant={"h5"} color={"#f2edd8"} fontFamily={"Oswald"}
//                         marginTop={5}>
//               Password
//             </Typography>
//             <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
//               <FormControl sx={{m: 1, width: 350, marginRight: 9}}
//                            variant="outlined">
//                 <InputLabel
//                     htmlFor="outlined-adornment-password">Password</InputLabel>
//                 <OutlinedInput
//                     ref={passwordRef}
//                     color={"success"}
//                     onChange={changPasswordValueHandler}
//                     id="outlined-adornment-password"
//                     type={showPassword ? 'text' : 'password'}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={handleClickShowPassword}
//                             onMouseDown={handleMouseDownPassword}
//                             edge="end"
//                         >
//                           {showPassword ? <VisibilityOff/> : <Visibility/>}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     label="Password"
//                 />
//               </FormControl>
//             </Box>
//
//             {/*join 부분*/}
//             <Button sx={{
//               marginTop: 3,
//               color: "#F3EED9",
//               width: 200,
//               marginBottom: 2
//             }}
//                     variant={"contained"} color={"inherit"}
//                     onClick={joinEventHandler}
//                     disabled={disabledJoin}
//             ><CelebrationIcon color={"warning"}/>
//               <Typography marginRight={2} marginLeft={2} fontFamily={"Oswald"}
//                           color={"black"}>Join</Typography>
//               <CelebrationIcon color={"error"}/>
//             </Button>
//             {/* 카카오 로그인부분 */}
//             <a href={`http://localhost:8080/oauth2/authorization/kakao`}>
//               <img width={200} height={40}
//                    src={`${process.env.PUBLIC_URL}/kakao/kakao_login_medium_wide.png`}/>
//             </a>
//             <a href="https://nid.naver.com/oauth2.0/authorize?client_id=Fbw9lQ3zaLgRySvArd5k&response_type=code&redirect_uri=http://localhost:8080/main/callback&state=1234">
//               <img
//                   width={200} height={40}
//                   src={`${process.env.PUBLIC_URL}/naver/naverimg.png`}/>
//             </a>
//           </Stack>
//         </Stack>
//
//       </Grid2>
//   )
// }