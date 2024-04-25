import React, { useState, useEffect } from "react"
import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import AppBar from "@mui/material/AppBar"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import { KeyboardArrowLeft } from "@mui/icons-material"
import FriendsAdd from "./FriendsAdd"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import PeopleIcon from "@mui/icons-material/People"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonOffIcon from "@mui/icons-material/PersonOff"
import ForumIcon from "@mui/icons-material/Forum"
import { Button } from "@mui/material"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { selectToken, setToken, logout } from "@/utils/authSlice.js"
import FriendsList from "./FriendsList"
import axios from "axios"
import { API_URL } from "@/utils/config"
import { selectUser } from "@/utils/authSlice"
import FriendsRequest from "./FriendsRequests"
import FriendsBlocked from "./FriendsBlocked"
import { Badge } from "@mui/material"
import Header from "../Header"
import RecommendIcon from "@mui/icons-material/Recommend"
import FriendsCancel from "./FriendsCancel"

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  //backgroundColor: "primary",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  borderRight: "1px solid black",
})

const closedMixin = (theme) => ({
  //backgroundColor: "primary",

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  borderRight: "1px solid black",
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const DrawerHeader2 = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  borderRight: "1px solid black",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

export default function FriendsSidebar() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const [activePage, setActivePage] = React.useState("list")
  const [friends, setFriendsList] = useState([])
  const [message, setMessage] = useState("")
  const user = useSelector(selectUser)
  const [userId, setUserid] = useState("")
  const [loggingOut, setLoggingOut] = useState(false)
  const [count, setCount] = useState(0)
  const [requestsValue, setRequestsValue] = useState(0)
  const [recommendationsValue, setRecommendationsValue] = useState(0)

  const navigateToProfile = () => {
    router.push("/profile")
  }

  const navigateFriends = () => {
    router.push("/friends")
  }

  const navigateHome = () => {
    router.push("/home")
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    localStorage.removeItem("token")
    dispatch(logout())
    router.push("/")
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleButtonClick = () => {
    setLoggingOut(true)
    handleLogout()
  }

  const fetchRequests = async () => {
    if (loggingOut) return
    try {
      const response = await axios.get(
        `${API_URL}/friends/${user.id}/getRequests`
      )
      setFriendsList(response.data)
    } catch (error) {
      console.error("Error fetching friends info:", error)
    }
  }

  useEffect(() => {
    if (user) {
      console.log("here")
      setUserid(user.id)
    }

    fetchRequests()

    const interval = setInterval(() => {
      // Update the state every couple of seconds
      setCount((prevCount) => prevCount + 1)
    }, 2000) // 2000 milliseconds = 2 seconds

    return () => clearInterval(interval)
  }, [user, message, activePage])

  const handleMessageUpdate = () => {
    if (message === "update") {
      setMessage("")
    } else {
      setMessage("update")
    }
  }

  const setActivePageList = () => {
    setActivePage("list")
  }

  const setActivePageRequests = () => {
    setActivePage("requests")
  }

  const setActivePageBlocked = () => {
    setActivePage("blocked")
  }

  const setActivePageChat = () => {
    setActivePage("chat")
  }

  const setActivePageRecommendation = () => {
    setActivePage("recommendation")
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />

      <StyledDrawer variant="permanent" open={open}>
        {open ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "initial",
              marginTop: "80px",
              marginLeft: "12px",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ marginTop: "4px", marginLeft: "10px" }}
            >
              Friends
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <KeyboardArrowLeft style={{ color: "black" }} />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "initial",
              marginTop: "80px",
              marginLeft: "12px",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <KeyboardArrowRightIcon style={{ color: "black" }} />
            </IconButton>
          </Box>
        )}
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={setActivePageList}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"All"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={setActivePageRequests}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Badge badgeContent={friends.length} color="primary">
                  <PersonAddIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText
                primary={"Requests"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={setActivePageBlocked}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonOffIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Blocked"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={setActivePageChat}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary={"Chat"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={setActivePageRecommendation}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RecommendIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Recommendations"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </StyledDrawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "", height: "100vh" }}
        overflow={"auto"}
      >
        <DrawerHeader />
        {activePage === "list" ? <FriendsList /> : null}
        {activePage === "requests" ? (
          <Box>
            <Button onClick={() => setRequestsValue(0)} variant="contained">Add Friends</Button>
            <Button onClick={() => setRequestsValue(1)} variant="contained">Outgoing Requests</Button>
            {requestsValue === 0 ? (
              <Box>
                <FriendsAdd />
                <FriendsRequest onUpdate={handleMessageUpdate} />
              </Box>
            ) : null}
            {requestsValue === 1 ? (
              <FriendsCancel onUpdate={handleMessageUpdate} />
            ) : null}
          </Box>
        ) : null}
        {activePage === "blocked" ? <FriendsBlocked /> : null}
        {activePage === "chat" ? <div>Chat</div> : null}
        {activePage === "recommendation" ? (
          <Box>
            <Button onClick={() => setRecommendationsValue(0)} variant="contained">User Recommendations</Button>
            <Button onClick={() => setRecommendationsValue(1)} variant="contained">Tutor Recommendations</Button>
            {recommendationsValue === 0 ? (
              <Box>
                <FriendsList listType="friendsRecommendations" />
              </Box>
            ) : null}
            {recommendationsValue === 1 ? (
              <FriendsList listType="tutorRecommendations" />
            ) : null}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}
