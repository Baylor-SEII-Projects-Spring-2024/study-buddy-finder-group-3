import React, { useRef, useState, useEffect, containerRef } from "react"
import { useRouter } from "next/router"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  styled,
} from "@mui/material"
import { Image as ImageIcon } from "@mui/icons-material"
import {
  Star as StarIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material"
import AOS from "aos"
import "aos/dist/aos.css"
import { useTheme } from "@mui/material/styles"
import Login from "./Login"
import CreateAccount from "./CreateAccount"
import Footer from "./Footer"
import styles from "@/styles/landing.module.css"
import CustomCursor from "@/utils/customCursor"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice"
import ChaseButton from "./ChaseButton"

const sections = [
  { title: "Home", id: "home-section" },
  { title: "About", id: "about-us-section" },
  { title: "Potential", id: "unlock-potential-section" },
  { title: "Customers", id: "customers-section" },
  { title: "Our Mission", id: "mission-section" },
  { title: "Contact", id: "contact-section" },
]

const testimonials = [
  {
    review:
      "Study Buddy is an amazing platform that has helped me improve my study habits and connect with like-minded individuals. Highly recommended!",
    name: "Name Name",
    role: "Student, Baylor University",
  },
  {
    review:
      "Study Buddy is an amazing platform that has helped me improve my study habits and connect with like-minded individuals. Highly recommended!",
    name: "Name Name",
    role: "Student, Baylor University",
  },
  {
    review:
      "Study Buddy is an amazing platform that has helped me improve my study habits and connect with like-minded individuals. Highly recommended!",
    name: "Name Name",
    role: "Professor, Baylor University",
  },
]

const FillButton = styled(Button)(({ theme, width, height, x, y }) => ({
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: `radial-gradient(circle closest-side at ${x}px ${y}px, ${theme.palette.primary.main}, transparent)`,
    transition: "background 0.3s",
  },
  "&:hover::after": {
    background: `radial-gradient(circle at ${x}px ${y}px, ${theme.palette.primary.dark}, transparent)`,
  },
}))

const LandingPage = () => {
  const theme = useTheme()
  const [loginOpen, setLoginOpen] = useState(false)
  const [createAccountOpen, setCreateAccountOpen] = useState(false)

  const handleOpenLogin = () => setLoginOpen(true)
  const handleCloseLogin = () => setLoginOpen(false)

  const handleOpenCreateAccount = () => setCreateAccountOpen(true)
  const handleCloseCreateAccount = () => setCreateAccountOpen(false)
  const [buttonProps, setButtonProps] = useState({ x: 0, y: 0 })

  const [isHovered, setIsHovered] = useState(false)

  // const router = useRouter();
//   const token = useSelector(selectToken);
//   const [isCheckingToken, setIsCheckingToken] = useState(true);

//   useEffect(() => {
//       const timer = setTimeout(() => {
//           setIsCheckingToken(false); 
//       }, 1000);  
//       if (token){
//         router.push("/home")
//       }
//       return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (token){
//       router.push("/home")
//     }
// }, [token, isCheckingToken, router]);


  useEffect(() => {
    AOS.init({})
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      AOS.refreshHard()
      section.setAttribute("data-aos", "none")

      section.scrollIntoView({ behavior: "smooth" })

      setTimeout(() => {
        section.removeAttribute("data-aos")
        AOS.refresh()
      }, 5000)
    }
  }

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect()
    setButtonProps({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const scrollToTop = () => {
    AOS.refreshHard()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    setTimeout(() => {
      AOS.refresh()
    }, 1000)
  }

  return (
    <>
      {/* <CustomCursor hover={isHovered} /> */}
      <AppBar position="fixed" color="primary">
        <Toolbar style={{ justifyContent: "center", alignItems: "center" }}>
          {/* left section */}
          <Box
            style={{ display: "flex", justifyContent: "flex-start", flex: "1" }}
          >
            {sections.map((section) => (
              <Button
                onMouseEnter={() => { setIsHovered(true) }}
                onMouseLeave={() => {setIsHovered(false)}}
                key={section.title}
                color="inherit"
                className={styles.buttonUnderlineCenter}
                onClick={() => scrollToSection(section.id)}
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    // cursor: 'none',
                    "@media (hover: none)": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
              >
                {section.title}
              </Button>
            ))}
          </Box>

          {/* center section */}
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              flex: "0 1 auto",
            }}
          >
            <img
              src="/StudyBuddyLogo Background Removed.png"
              alt="Logo"
              style={{ maxHeight: "50px", cursor: "pointer" }}
              onClick={() => scrollToTop()}
            />
          </Box>

          {/* rigjt section */}
          <Box
            style={{ display: "flex", justifyContent: "flex-end", flex: "1" }}
          >
            <Button
              color="inherit"
              onMouseEnter={() => { setIsHovered(true) }}
              onMouseLeave={() => {setIsHovered(false)}}
              onClick={handleOpenCreateAccount}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  // cursor: 'none',
                  "@media (hover: none)": {
                    backgroundColor: "transparent",
                  },
                },
              }}
              className={styles.buttonUnderlineCenter}
            >
              Create Account
            </Button>
            <Button
              color="inherit"
              onMouseEnter={() => { setIsHovered(true) }}
              onMouseLeave={() => {setIsHovered(false)}}
              onClick={handleOpenLogin}
              sx={{
                "&:hover": {
                  // cursor: 'none',
                  backgroundColor: "transparent",
                  "@media (hover: none)": {
                    backgroundColor: "transparent",
                  },
                },
              }}
              className={styles.buttonUnderlineCenter}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Home section */}
      <div data-aos="zoom-out-left">
        <div data-aos="fade-up" data-aos-duration="1000">
          <Box
            id="home-section"
            sx={{
              height: "100vh", //100% of view height
              display: "flex", // flexbox
              flexDirection: "column",
              justifyContent: "center", // center to parent, verticle
              alignItems: "center", // horizontal center
              backgroundColor: theme.palette.background.default, //fetch from themes
              color: theme.palette.fontColor.main, //fetch frome themes
              textAlign: "center", // allign center to parent
              p: 4, //padding
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", color: theme.palette.fontColor.main }}
            >
              Connect and study with Study Buddy
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Study Buddy is the perfect platform to find study partners,
              schedule meetings, and ace your exams.
            </Typography>
            <Box>
              <ChaseButton
                // variant="contained"
                // onMouseMove={handleMouseMove}
                // sx={{ bgcolor: "black", "&:hover": { bgcolor: "grey.900" } }}
                onClick={handleOpenCreateAccount}
              >
                Get Started
              </ChaseButton>
              <ChaseButton
                // variant="outlined"
                // sx={{
                //   color: "black",
                //   borderColor: "black",
                //   "&:hover": { borderColor: "grey.900" },
                // }}
                onClick={scrollToSection.bind(null, "about-us-section")}
              >
                Learn More
              </ChaseButton>
            </Box>
          </Box>
        </div>
      </div>

      {/* About Us section */}
      <div
        data-aos-duration="1000" //durat  ion in milliseconds
      >
        <Box
          id="about-us-section"
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.fontColor.main,
            p: 4,
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              spacing={8}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h3"
                  component="h2"
                  gutterBottom
                  data-aos="fade-up"
                >
                  Effortlessly schedule meetings and connect with study buddies
                </Typography>
                <Typography variant="subtitle1" data-aos="zoom-out-left">
                  With Study Buddy, you can easily set up meetings with fellow
                  students, making it convenient to collaborate and learn
                  together. Join study sessions, exchange ideas, and boost your
                  academic performance.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    height: 300,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <ImageIcon
                    sx={{ fontSize: 100, color: theme.palette.grey[400] }}
                  />{" "}
                  {/* Placeholder for an image */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>

      <div
        data-aos="fade-up" //  fade-up animation
        data-aos-delay="100" //  delay in milliseconds
        data-aos-duration="1000" //  duration in milliseconds
      >
        <Box
          id="unlock-potential-section"
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.background.main,
            color: theme.palette.fontColor.main,
            p: 4,
          }}
        >
          <Container maxWidth="lg" sx={{ overflowY: "auto" }}>
            <Grid
              container
              spacing={8}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  component="h3"
                  data-aos="zoom-out-left"
                  gutterBottom
                >
                  Unlock Your Potential with Study Buddy
                </Typography>
                <Typography variant="subtitle1" data-aos="fade-up" gutterBottom>
                  Study Buddy is the ultimate tool for effective learning and
                  networking. With Study Buddy, you can easily set up meetings,
                  join study sessions, and connect with like-minded individuals.
                </Typography>
                <Box sx={{ my: 4 }}>
                  <Typography
                    variant="h6"
                    component="h4"
                    data-aos="zoom-out-right"
                    gutterBottom
                  >
                    Efficient Learning
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Collaborate with peers, exchange knowledge, and enhance your
                    understanding of subjects.
                  </Typography>
                  <Typography variant="h6" component="h4" gutterBottom>
                    Network Building
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Expand your network, make valuable connections, and create
                    lifelong study buddies.
                  </Typography>
                  <Button variant="contained" sx={{ mr: 2 }}>
                    Learn More
                  </Button>
                  <Button variant="outlined" onClick={handleOpenCreateAccount}>
                    Sign Up
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    height: 300,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <ImageIcon
                    sx={{ fontSize: 100, color: theme.palette.grey[400] }}
                  />{" "}
                  {/* Placeholder for an image */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>

      <div
        data-aos="fade-up" //  fade-up animation
        data-aos-delay="100" //  delay in milliseconds
        data-aos-duration="1000" //  duration in milliseconds
      >
        <Box
          id="customers-section"
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column", //  vertical layout.
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.fontColor.main,
            p: 4,
            overflow: "hidden", //  hides overflow
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Happy Customers
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
              Read what our satisfied users have to say about Study Buddy.
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        mb: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          sx={{ color: theme.palette.secondary.main }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {testimonial.review}
                    </Typography>
                    <AccountCircleIcon
                      sx={{ fontSize: 60, color: theme.palette.grey[400] }}
                    />
                    <Typography variant="subtitle2">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="caption">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </div>
      
      <Login open={loginOpen} onClose={handleCloseLogin} />
      <CreateAccount
        open={createAccountOpen}
        onClose={handleCloseCreateAccount}
      />
      <div>
        <Footer/>
      </div>
    </>
  )
}

export default LandingPage