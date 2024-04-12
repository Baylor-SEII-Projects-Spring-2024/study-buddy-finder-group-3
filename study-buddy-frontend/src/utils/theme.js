import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"

/*
 * //! Important
 * in order to use these global fonts add this import:
 * import { useTheme } from "@mui/material/styles"
 * and then call:
 *   const theme = useTheme()
 * in the function
 * 
 * to access anything from here call like this:
 * backgroundColor: theme.palette.background.default
 */
const themeOptions = {
  typography: {
    fontFamily: "Roboto, Noto Sans, sans-serif",
    fontSize: 14,
    body2: {
      fontSize: 14,
    },
  },
  palette: {
    background: {
      default: "#FFFFFF", // off white
    },
    primary: {
      main: "#628dbd", //  purple
    },
    secondary: {
      main: "#85cc6f", // mint
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
          overflowY: "hidden",
        },
      },
    },
  },
}

const theme = createTheme(themeOptions)

export const StudyBuddyThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
