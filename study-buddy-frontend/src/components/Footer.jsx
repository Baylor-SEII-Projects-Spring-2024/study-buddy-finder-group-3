import React from "react"
import { Box, Divider, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Button } from "react-scroll"

const Itemspacing = 20
const textSpacing = 2

export default function Footer() {
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flexStart",
            justifyContent: "flex-start",
            marginBottom: 10,
          }}
        >
          <Box marginRight={Itemspacing}>
            <img
              src="/StudyBuddyLogo Background Removed.png"
              alt="Logo"
              style={{ maxHeight: "70px" }}
            />
          </Box>
          <Box marginRight={Itemspacing}>
            <Box paddingBottom={textSpacing}>
              <Typography variant="h7" align="center" fontWeight={"bold"}>
                About Us
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Home
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Features
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Contact
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Pricing
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Blog
              </Typography>
            </Box>
          </Box>
          <Box marginRight={Itemspacing}>
            <Box paddingBottom={textSpacing}>
              <Typography variant="h7" align="center" fontWeight={"bold"}>
                Support
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                FAQ
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Terms
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Privacy
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Security
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Sitemap
              </Typography>
            </Box>
          </Box>
          <Box marginRight={Itemspacing}>
            <Box paddingBottom={textSpacing}>
              <Typography variant="h7" align="center" fontWeight={"bold"}>
                Resources
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Help Center
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Community
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Partners
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Developers
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Documentation
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              maxWidth: "100%",
            }}
          >
            <Box paddingBottom={textSpacing}>
              <Typography variant="h7" align="center" fontWeight={"bold"}>
                Subscribe
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align="center">
                Join our community to stay up to date on new features and
                releases.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                id="subscribe-field"
                label="Enter your email"
                variant="outlined"
                fullWidth
              />
              <Button variant="outlined" style={{marginLeft: 20}}>
              Subscribe
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginTop: 3,
          }}
        >
          <Typography variant="subtitle1" align="center">
            © 2021 StudyBuddy
          </Typography>
        </Box>
      </Box>
    </>
  )
}
