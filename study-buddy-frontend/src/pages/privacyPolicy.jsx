import React from "react"
import { IconButton, Link, Typography } from "@mui/material"
import Footer from "@/components/Footer"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Box from "@mui/material/Box"

const PPolicy = () => {
  const returnHome = () => {
    window.location.href = "/"
  }

  return (
    <div>
      <IconButton onClick={returnHome}>
        <ArrowBackIcon />
        Back
      </IconButton>
      <Box sx={{padding: 5}}>
        <Box style={{ textAlign: "center" }} sx={{marginBottom: 2}}>
          <Typography variant="h2">Privacy Policy</Typography>
        </Box>
        <Typography variant="body1">
            Your privacy is important to us. It is StudyBuddy's policy to respect
            your privacy regarding any information we may collect from you across
            our website, <Link href="/">https://studybuddy.com</Link>, and other sites we own and operate.
        </Typography>
        <Typography variant="body1">
            We only ask for personal information when we truly need it to provide a
            service to you. We collect it by fair and lawful means, with your
            knowledge and consent. We also let you know why we're collecting it and
            how it will be used.
        </Typography>
        <Typography variant="body1">
            We only retain collected information for as long as necessary to provide
            you with your requested service. What data we store, we'll protect within
            commercially acceptable means to prevent loss and theft, as well as
            unauthorized access, disclosure, copying, use or modification.
        </Typography>
        <Typography variant="body1">
            We don't share any personally identifying information publicly or with
            third-parties, except when required to by law.
        </Typography>
        <Typography variant="body1">
            Our website may link to external sites that are not operated by us. Please
            be aware that we have no control over the content and practices of these
            sites, and cannot accept responsibility or liability for their respective
            privacy policies.
        </Typography>

        <Typography variant="body1">
            You are free to refuse our request for your personal information, with the
            understanding that we may be unable to provide you with some of your desired
            services.
        </Typography>
        <Typography variant="body1">
            Your continued use of our website will be regarded as acceptance of our
            practices around privacy and personal information. If you have any questions
            about how we handle user data and personal information, feel free to contact us.
        </Typography>
        <Typography variant="body2" marginTop={3}>
            Last updated: 2024-03-23
        </Typography>
      </Box>
      <Footer />
    </div>
  )
}

export default PPolicy
