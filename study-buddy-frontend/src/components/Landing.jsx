import React, { useRef, useState, useEffect, containerRef } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import { Image as ImageIcon } from "@mui/icons-material"
import {
  Star as StarIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material"
import dynamic from "next/dynamic"
import "locomotive-scroll/dist/locomotive-scroll.css"
// import "@/styles/LocomotiveScroll.module.css"
const DynamicLocomotiveScroll = dynamic(
  () => import("locomotive-scroll").then((ls) => ls.default || ls),
  { ssr: false }
)

// theme instance
const theme = createTheme({
  palette: {
    background: {
      default: "#f7f0fa",
    },
    primary: {
      main: "#5813d6",
      // Dark purple
    },
    secondary: {
      main: "#c3f0c8",
    },
    fontColor: {
      main: "#00000",
    },
  },
})

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        margin: theme.spacing(1),
      },
    },
  },
}

const sections = [
  { title: "Home", id: "home-section" },
  { title: "About", id: "about-us-section" },
  { title: "Potential", id: "unlock-potential-section" },
  { title: "Customers", id: "customers-section" },
]

const testimonials = [
  {
    review:
      "Study Buddy is an amazing platform that has helped me improve my study habits and connect with like-minded individuals. Highly recommended!",
    name: "Wesley Anastasi",
    role: "Student, Baylor University",
  },
  {
    review:
      "Study Buddy is an amazing platform that has helped me improve my study habits and connect with like-minded individuals. Highly recommended!",
    name: "Alex Baratta",
    role: "Student, Baylor University",
  },
  {
    review:
      "Study Buddy is an amazing platform that has helped me improve my study habits and connect with like-minded individuals. Highly recommended!",
    name: "Dr. Song",
    role: "Professor, Baylor University",
  },
]

const LandingPage = () => {
  const containerRef = useRef(null)
  const [locoScroll, setLocoScroll] = useState(null)

  useEffect(() => {
    let locomotiveScroll

    if (containerRef.current) {
      // Ensure DynamicLocomotiveScroll is loaded before usage
      import("locomotive-scroll").then((LocomotiveScrollModule) => {
        const LocomotiveScroll = LocomotiveScrollModule.default
        locomotiveScroll = new LocomotiveScroll({
          el: containerRef.current,
          smooth: true,
          lerp: 0.1,
          multiplier: 1, //  speed of the scrolling
          class: "is-reveal", // the class to add when element is in view
        })
        setLocoScroll(locomotiveScroll)
      })
    }

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy()
    }
  }, [])
  const scrollToSection = (sectionId) => {
    locoScroll?.scrollTo(`#${sectionId}`, {
      offset: -100,
      duration: 1000, // Duration of the scroll animation in milliseconds
      easing: [0.25, 0.0, 0.35, 1.0], //  easing 
      disableLerp: true, // disable the lerp effect (smoothing) for this scroll
    })
  }

  return (
    <div data-scroll-container ref={containerRef}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <Typography variant="h6">Logo</Typography>
            <Box sx={{ flexGrow: 1 }} />
            {sections.map((section) => (
              <Button
                key={section.title}
                color="inherit"
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </Button>
            ))}
          </Toolbar>
        </AppBar>

        {/* Home section */}
        <Box
          data-scroll-section
          id="home-section"
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.fontColor.main,
            textAlign: "center",
            p: 4,
          }}
        >
          <Typography
            data-scroll
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Connect and study with Study Buddy
          </Typography>
          <Typography data-scroll variant="h6" sx={{ mb: 4 }}>
            Study Buddy is the perfect platform to find study partners, schedule
            meetings, and ace your exams.
          </Typography>
          <Box>
            <Button
              data-scroll
              variant="contained"
              sx={{ bgcolor: "black", "&:hover": { bgcolor: "grey.900" } }}
            >
              Get Started
            </Button>
            <Button
              data-scroll
              variant="outlined"
              sx={{
                color: "black",
                borderColor: "black",
                "&:hover": { borderColor: "grey.900" },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* About Us section */}
        <Box
          data-scroll-section
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
                  data-scroll
                >
                  Effortlessly schedule meetings and connect with study buddies
                </Typography>
                <Typography
                  variant="subtitle1"
                  data-scroll
                >
                  With Study Buddy, you can easily set up meetings with fellow
                  students, making it convenient to collaborate and learn
                  together. Join study sessions, exchange ideas, and boost your
                  academic performance.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  data-scroll
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
        <Box
          data-scroll-section
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
          <Container maxWidth="lg">
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
                  gutterBottom
                  data-scroll
                >
                  Unlock Your Potential with Study Buddy
                </Typography>
                <Typography variant="subtitle1" gutterBottom data-scroll
>
                  Study Buddy is the ultimate tool for effective learning and
                  networking. With Study Buddy, you can easily set up meetings,
                  join study sessions, and connect with like-minded individuals.
                </Typography>
                <Box sx={{ my: 4 }}>
                  <Typography variant="h6" component="h4" gutterBottom data-scroll> 
                    Efficient Learning
                  </Typography>
                  <Typography variant="body1" gutterBottom data-scroll>
                    Collaborate with peers, exchange knowledge, and enhance your
                    understanding of subjects.
                  </Typography>
                  <Typography variant="h6" component="h4" gutterBottom data-scroll>
                    Network Building
                  </Typography>
                  <Typography variant="body1" gutterBottom data-scroll>
                    Expand your network, make valuable connections, and create
                    lifelong study buddies.
                  </Typography>
                  <Button data-scroll variant="contained" sx={{ mr: 2 }}>
                    Learn More
                  </Button>
                  <Button data-scroll variant="outlined">Sign Up</Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  data-scroll
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

        <Box
          data-scroll-section
          id="customers-section"
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
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              align="center"
              data-scroll
            >
              Happy Customers
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
              Read what our satisfied users have to say about Study Buddy.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {/* Map this Grid item for each testimonial */}
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

        {/* footer */}
      </ThemeProvider>
    </div>
  )
}

export default LandingPage
