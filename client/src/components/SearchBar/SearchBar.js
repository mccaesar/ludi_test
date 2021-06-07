import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchBar = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');
  const { resources } = useSelector((state) => state.resourceList);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const clear = () => {
    setSearchValue('');
  };

  const handleSubmit = async (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      search(searchValue);
      clear();
    }
  };

  return (
    <Autocomplete
      freeSolo
      id="search-bar"
      fullWidth
      disableClearable
      options={resources.map((resource) => resource.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for learning resources"
          margin="normal"
          variant="outlined"
          onChange={handleInputChange}
          InputProps={{ ...params.InputProps, type: 'search' }}
        />
      )}
      onKeyDown={handleSubmit}
    />
  );
};

export default SearchBar;
