// import React, { useRef, useState, useEffect, containerRef } from "react"
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   Typography,
//   Container,
//   Grid,
//   Paper,
// } from "@mui/material"
// import { Image as ImageIcon } from "@mui/icons-material"
// import {
//   Star as StarIcon,
//   AccountCircle as AccountCircleIcon,
// } from "@mui/icons-material"
// import AOS from "aos"
// import "aos/dist/aos.css"
// import { useTheme } from "@mui/material/styles"
// import Login from "./Login"
// import CreateAccount from "./CreateAccount"
//
// const sections = [
//   { title: "Home", id: "home-section" },
//   { title: "About", id: "about-us-section" },
//   { title: "Potential", id: "unlock-potential-section" },
//   { title: "Customers", id: "customers-section" },
// ]
//
// const testimonials = [
//   {
//     review:
//       "Study Buddy is an amazing platform that has helped me improve my study habits and connect with like-minded individuals. Highly recommended!",
//     name: "Name Name",
//     role: "Student, Baylor University",
//   },
//   {
//     review:
//       "Study Buddy is an amazing platform that has helped me improve my study habits and connect with like-minded individuals. Highly recommended!",
//     name: "Name Name",
//     role: "Student, Baylor University",
//   },
//   {
//     review:
//       "Study Buddy is an amazing platform that has helped me improve my study habits and connect with like-minded individuals. Highly recommended!",
//     name: "Name Name",
//     role: "Professor, Baylor University",
//   },
// ]
//
// const LandingPage = () => {
//   const theme = useTheme()
//   const [loginOpen, setLoginOpen] = useState(false)
//   const [createAccountOpen, setCreateAccountOpen] = useState(false)
//
//   const handleOpenLogin = () => setLoginOpen(true)
//   const handleCloseLogin = () => setLoginOpen(false)
//
//   const handleOpenCreateAccount = () => setCreateAccountOpen(true)
//   const handleCloseCreateAccount = () => setCreateAccountOpen(false)
//
//   useEffect(() => {
//     AOS.init({})
//     // AOS.refresh()
//   }, [])
//
//   const scrollToSection = (sectionId) => {
//     // const section = document.getElementById(sectionId);
//     // if (section) {
//     //   section.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     //   // Trigger AOS to recalculate positions after scroll
//     //   AOS.refresh();
//     // }
//   }
//
//   return (
//     <>
//       <AppBar position="fixed" color="primary">
//         <Toolbar style={{ justifyContent: "space-between" }}>
//           {/* Sections on the left */}
//           <Box style={{ display: "flex", flexGrow: 1 }}>
//             {/* map sections to appbar */}
//             {sections.map((section) => (
//               <Button
//                 key={section.title}
//                 color="inherit"
//                 onClick={() => scrollToSection(section.id)}
//               >
//                 {section.title}
//               </Button>
//             ))}
//           </Box>
//           <Box>
//             <Button color="inherit" onClick={handleOpenCreateAccount}>Create Account</Button>
//             <Button color="inherit" onClick={handleOpenLogin}>Login</Button>
//           </Box>
//         </Toolbar>
//       </AppBar>
//
//       {/* Home section */}
//       <div data-aos="zoom-out-left">
//         <div data-aos="fade-up" data-aos-duration="1000">
//           <Box
//             id="home-section"
//             sx={{
//               height: "100vh", //100% of view height
//               display: "flex", // flexbox
//               flexDirection: "column",
//               justifyContent: "center", // center to parent, verticle
//               alignItems: "center",  // horizontal center
//               backgroundColor: theme.palette.background.default, //fetch from themes
//               color: theme.palette.fontColor.main, //fetch frome themes
//               textAlign: "center", // allign center to parent
//               p: 4, //padding
//             }}
//           >
//             <Typography
//               variant="h2"
//               component="h1"
//               gutterBottom
//               sx={{ fontWeight: "bold" }}
//             >
//               Connect and study with Study Buddy
//             </Typography>
//             <Typography variant="h6" sx={{ mb: 4 }}>
//               Study Buddy is the perfect platform to find study partners,
//               schedule meetings, and ace your exams.
//             </Typography>
//             <Box>
//               <Button
//                 variant="contained"
//                 sx={{ bgcolor: "black", "&:hover": { bgcolor: "grey.900" } }}
//               >
//                 Get Started
//               </Button>
//               <Button
//                 variant="outlined"
//                 sx={{
//                   color: "black",
//                   borderColor: "black",
//                   "&:hover": { borderColor: "grey.900" },
//                 }}
//               >
//                 Learn More
//               </Button>
//             </Box>
//           </Box>
//         </div>
//       </div>
//
//       {/* About Us section */}
//       <div
//         data-aos-duration="1000" //  duration in milliseconds
//       >
//         <Box
//           id="about-us-section"
//           sx={{
//             height: "100vh",
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: theme.palette.background.default,
//             color: theme.palette.fontColor.main,
//             p: 4,
//           }}
//         >
//           <Container maxWidth="lg">
//             <Grid
//               container
//               spacing={8}
//               alignItems="center"
//               justifyContent="center"
//             >
//               <Grid item xs={12} md={6}>
//                 <Typography
//                   variant="h3"
//                   component="h2"
//                   gutterBottom
//                   data-aos="fade-up"
//                 >
//                   Effortlessly schedule meetings and connect with study buddies
//                 </Typography>
//                 <Typography variant="subtitle1" data-aos="zoom-out-left">
//                   With Study Buddy, you can easily set up meetings with fellow
//                   students, making it convenient to collaborate and learn
//                   together. Join study sessions, exchange ideas, and boost your
//                   academic performance.
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     height: 300,
//                     width: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backgroundColor: "#fff",
//                     border: `1px solid ${theme.palette.primary.main}`,
//                   }}
//                 >
//                   <ImageIcon
//                     sx={{ fontSize: 100, color: theme.palette.grey[400] }}
//                   />{" "}
//                   {/* Placeholder for an image */}
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>
//       </div>
//
//       <div
//         data-aos="fade-up" //  fade-up animation
//         data-aos-delay="100" //  delay in milliseconds
//         data-aos-duration="1000" //  duration in milliseconds
//       >
//         <Box
//           id="unlock-potential-section"
//           sx={{
//             height: "100vh",
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: theme.palette.background.main,
//             color: theme.palette.fontColor.main,
//             p: 4,
//           }}
//         >
//           <Container maxWidth="lg" sx={{ overflowY: "auto" }}>
//             <Grid
//               container
//               spacing={8}
//               alignItems="center"
//               justifyContent="center"
//             >
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h4" component="h3" gutterBottom>
//                   Unlock Your Potential with Study Buddy
//                 </Typography>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Study Buddy is the ultimate tool for effective learning and
//                   networking. With Study Buddy, you can easily set up meetings,
//                   join study sessions, and connect with like-minded individuals.
//                 </Typography>
//                 <Box sx={{ my: 4 }}>
//                   <Typography variant="h6" component="h4" gutterBottom>
//                     Efficient Learning
//                   </Typography>
//                   <Typography variant="body1" gutterBottom>
//                     Collaborate with peers, exchange knowledge, and enhance your
//                     understanding of subjects.
//                   </Typography>
//                   <Typography variant="h6" component="h4" gutterBottom>
//                     Network Building
//                   </Typography>
//                   <Typography variant="body1" gutterBottom>
//                     Expand your network, make valuable connections, and create
//                     lifelong study buddies.
//                   </Typography>
//                   <Button variant="contained" sx={{ mr: 2 }}>
//                     Learn More
//                   </Button>
//                   <Button variant="outlined">Sign Up</Button>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     height: 300,
//                     width: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backgroundColor: "#fff",
//                     border: `1px solid ${theme.palette.primary.main}`,
//                   }}
//                 >
//                   <ImageIcon
//                     sx={{ fontSize: 100, color: theme.palette.grey[400] }}
//                   />{" "}
//                   {/* Placeholder for an image */}
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>
//       </div>
//
//       <div
//         data-aos="fade-up" //  fade-up animation
//         data-aos-delay="100" //  delay in milliseconds
//         data-aos-duration="1000" //  duration in milliseconds
//       >
//         <Box
//           id="customers-section"
//           sx={{
//             minHeight: "100vh",
//             display: "flex",
//             flexDirection: "column", //  vertical layout.
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: theme.palette.background.default,
//             color: theme.palette.fontColor.main,
//             p: 4,
//             overflow: "hidden", //  hides overflow
//           }}
//         >
//           <Container maxWidth="lg">
//             <Typography variant="h4" component="h2" gutterBottom align="center">
//               Happy Customers
//             </Typography>
//             <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
//               Read what our satisfied users have to say about Study Buddy.
//             </Typography>
//
//             <Grid container spacing={4} justifyContent="center">
//               {testimonials.map((testimonial, index) => (
//                 <Grid item xs={12} sm={4} key={index}>
//                   <Box sx={{ textAlign: "center" }}>
//                     <Box
//                       sx={{
//                         mb: 1,
//                         display: "inline-flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       {[...Array(5)].map((_, i) => (
//                         <StarIcon
//                           key={i}
//                           sx={{ color: theme.palette.secondary.main }}
//                         />
//                       ))}
//                     </Box>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                       {testimonial.review}
//                     </Typography>
//                     <AccountCircleIcon
//                       sx={{ fontSize: 60, color: theme.palette.grey[400] }}
//                     />
//                     <Typography variant="subtitle2">
//                       {testimonial.name}
//                     </Typography>
//                     <Typography variant="caption">
//                       {testimonial.role}
//                     </Typography>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </Box>
//       </div>
//       <Login open={loginOpen} onClose={handleCloseLogin} />
//       <CreateAccount
//         open={createAccountOpen}
//         onClose={handleCloseCreateAccount}
//       />
//       {/* footer */}
//     </>
//   )
// }
//
// export default LandingPage
