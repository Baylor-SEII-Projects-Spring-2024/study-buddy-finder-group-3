import React, { useState } from "react";
import Login from "./Login";
import Button from "@mui/material/Button";

function Header() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
    >
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundColor: "#1d612a",
          "&:hover": {
            backgroundColor: "#0a3011",
          },
        }}

        style={{ marginRight: "10px" }}
      >
        Login
      </Button>
      <Login open={open} onClose={handleClose} />
    </div>
  );
}

export default Header;
