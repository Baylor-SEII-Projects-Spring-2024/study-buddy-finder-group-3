import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    
  };

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
      />
    </Box>
  );
};

export default SearchBar;
