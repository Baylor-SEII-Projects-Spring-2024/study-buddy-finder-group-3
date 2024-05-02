import React from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#000000",
  cursor: "pointer",
  fontFamily: "Roboto, Noto Sans, sans-serif",
  textTransform: "uppercase",
  position: "relative",
  overflow: "hidden",
  padding: "0.5rem 1rem",

  "& svg": {
    position: "absolute",
    //offsets to make the stroke cover the whole button
    top: "-2px", 
    bottom: "-2px", 
    right: "-2px",
    left: "-2px", 
    width: "calc(100% + 4px)",
    height: "calc(100% + 4px)",
    overflow: "visible", // stroke isn't clipped
  },

  "& rect": {
    fill: "none",
    stroke: "#000000",
    strokeWidth: 7,
    strokeDasharray: "450, 0",
    transition:
      "stroke-dasharray 0.5s linear, stroke 0.5s linear, stroke-width 0.5s linear",
  },

  "&:hover": {
    color: "#000000",

    "& rect": {
      strokeWidth: 5,
      strokeDasharray: "20, 300",
      strokeDashoffset: 48,
      stroke: "#000000",
      transition:
        "stroke-width 2s cubic-bezier(0.22, 1, 0.25, 1), stroke-dasharray 2s cubic-bezier(0.22, 1, 0.25, 1), stroke 0.5s linear",
    },
  },
}))

const ChaseButton = ({ onClick, children }) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
      <svg>
        <rect x="0" y="0" width="100%" height="100%" />
      </svg>
    </StyledButton>
  )
}

export default ChaseButton
