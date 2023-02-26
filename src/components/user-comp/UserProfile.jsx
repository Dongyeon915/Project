import {Avatar, Box, Stack, Typography} from "@mui/material";

function userProfile({userInfo}) {

  return (
      <Box sx={{
        width: 240,
        height: 100,
        backgroundColor: "#DBE9FC",
        borderRadius: 5,
        padding: 2
      }}>
        <Stack direction={"row"} spacing={3}>
          <Avatar alt="유저이미지" src={userInfo.avatar_url}
                  sx={{width: 60, height: 60}}/>
          <Stack spacing={1} justifyContent={"center"}>
            <Typography variant={"h6"}>
              {userInfo.name}
            </Typography>
            <Typography variant={"body1"}>
              {userInfo.campany}
            </Typography>
            <Typography variant={"body2"}>
              {userInfo.location}
            </Typography>
          </Stack>
        </Stack>
      </Box>
  )
}

export default userProfile