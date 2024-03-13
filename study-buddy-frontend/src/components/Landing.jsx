import React, { useState } from "react"
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material"
import { Link as ScrollLink } from "react-scroll"
import Login from "./Login"
import CreateAccount from "./CreateAccount"
function LandingPage() {
  const theme = useTheme()

  const [loginOpen, setLoginOpen] = useState(false)
  const [createAccountOpen, setCreateAccountOpen] = useState(false)

  const handleOpenLogin = () => setLoginOpen(true)
  const handleCloseLogin = () => setLoginOpen(false)

  const handleOpenCreateAccount = () => setCreateAccountOpen(true)
  const handleCloseCreateAccount = () => setCreateAccountOpen(false)

  return (
    <>
      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Study Buddy
          </Typography>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <ScrollLink to="mission" smooth={true} offset={0} duration={500}>
              <Button>Our Mission</Button>
            </ScrollLink>
            <ScrollLink to="features" smooth={true} offset={0} duration={500}>
              <Button>Features</Button>
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              smooth={true}
              offset={0}
              duration={500}
            >
              <Button>Testimonials</Button>
            </ScrollLink>
            <Button
              onClick={handleOpenLogin}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <ScrollLink to="join" smooth={true} offset={0} duration={500}>
              <Button
                variant="contained"
                color="primary"
                // onClick={handleOpenCreateAccount}
              >
                Join Now
              </Button>
            </ScrollLink>
          </Box>
        </Toolbar>
      </AppBar>

      <Container disableGutters maxWidth={false} sx={{ pt: 0 }}>
        <Box
          id="mission"
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Our Mission
          </Typography>
          <Typography textAlign="center">to get 3js to not be the most annoying library to work with </Typography>
        </Box>

        <Box
          id="features"
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Features
          </Typography>
          <Typography textAlign="center">suff go here </Typography>
        </Box>

        <Box
          id="testimonials"
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Testimonials
          </Typography>
          <Typography textAlign="center">
            "Best study platform ever!" - Not a made up name
          </Typography>
        </Box>

        <Box
          id="join"
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Join the Community
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpenCreateAccount}
          >
            Sign Up Now
          </Button>
        </Box>
      </Container>

      <Login open={loginOpen} onClose={handleCloseLogin} />
      <CreateAccount
        open={createAccountOpen}
        onClose={handleCloseCreateAccount}
      />
    </>
  )
}

export default LandingPage
