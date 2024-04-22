import React from "react"
import { Box, Divider, TextField, Button, Link } from "@mui/material"
import Typography from "@mui/material/Typography"

const Itemspacing = 20
const textSpacing = 2
const textAllign = "left"

export default function Footer() {
  const handleClick = () => {}

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
              <Typography variant="h7" align={textAllign} fontWeight={"bold"}>
                About Us
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Home
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Features
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Contact
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Pricing
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Blog
              </Typography>
            </Box>
          </Box>
          <Box marginRight={Itemspacing}>
            <Box paddingBottom={textSpacing}>
              <Typography variant="h7" align={textAllign} fontWeight={"bold"}>
                Support
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                FAQ
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Terms
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Privacy
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Security
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Sitemap
              </Typography>
            </Box>
          </Box>
          <Box marginRight={Itemspacing}>
            <Box paddingBottom={textSpacing}>
              <Typography variant="h7" align={textAllign} fontWeight={"bold"}>
                Resources
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Help Center
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Community
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Partners
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Developers
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
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
              <Typography variant="h7" align={textAllign} fontWeight={"bold"}>
                Subscribe
              </Typography>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                Join our community to stay up to date on new features and
                releases.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: textSpacing,
              }}
            >
              <TextField
                id="subscribe-field"
                label="Enter your email"
                variant="outlined"
                sx={{ width: "20vw" }}
              />
              <Button style={{ marginLeft: 20, color: "black" }}>
                Subscribe
              </Button>
            </Box>
            <Box paddingBottom={textSpacing}>
              <Typography variant="body2" align={textAllign}>
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </Typography>
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
          <Typography variant="subtitle1" align="center" marginRight={10}>
            © 2024 StudyBuddy. All rights reserved.
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            marginRight={3}
            sx={{ textDecoration: "underline" }}
          >
            <Link href="">Privacy Policy</Link>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            marginRight={3}
            sx={{ textDecoration: "underline" }}
          >
            <Link href="terms">Terms of Service</Link>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            marginRight={3}
            sx={{ textDecoration: "underline" }}
          >
            <Link href="">Cookie Settings</Link>
          </Typography>
        </Box>
      </Box>
    </>
  )
}