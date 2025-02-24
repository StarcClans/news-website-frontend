import React from 'react';
import TextField from '@mui/material/TextField';

function SearchBar({ setSearchTerm }) {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      id="search"
      label="Search Articles..."
      type="search"
      onChange={handleChange}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
}

export default SearchBar;