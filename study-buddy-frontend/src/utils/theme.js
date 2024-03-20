import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"

// Theme configuration that was previously in the LandingPage component
const themeOptions = {
  typography: {
    fontFamily: 'Roboto, Noto Sans, sans-serif',
    fontSize: 14,
    body2: {
        fontSize: 14
    }
},
  palette: {
    background: {
      default: "#f7f0fa",
    },
    primary: {
      main: "#5813d6", //  purple
    },
    secondary: {
      main: "#c3f0c8",
    },
    fontColor: {
      main: "#00000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: 8,
          textTransform: "none", // Preserve text case
        },
        outlinedPrimary: {
          border: "2px solid",
        },
        outlinedSecondary: {
          border: "2px solid",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box", //  padding and borders in the element's total width and height
        },
        body: {
          overflowX: "hidden",
          overflowY: "hidden"
        },
      },
    },
  },
}

const theme = createTheme(themeOptions)

export const StudyBuddyThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
