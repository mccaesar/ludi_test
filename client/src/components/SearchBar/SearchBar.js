import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SearchBar = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');
  const { resources } = useSelector((state) => state.resourceList);
  const [switchState, setSwitchState] = React.useState({
    authorChecked: true,
    descriptionChecked: true,
  });

  const handleChange = (e) => {
    if (e.target.name === 'searchBar') {
      setSearchValue(e.target.value);
    }
    else {
      setSwitchState({ ...switchState, [e.target.name]: e.target.checked });
    }
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
    <div>
      <Autocomplete
        freeSolo
        fullWidth
        options={resources.map((resource) => resource.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search resources..."
            margin="normal"
            variant="outlined"
            name="searchBar"
            onChange={handleChange}
          />
        )}
        onKeyDown={handleSubmit}
      />

      <FormGroup row>
        <FormControlLabel
          control={<Switch checked={switchState.authorChecked} onChange={handleChange} name="authorChecked" />}
          label="Author"
        />
        <FormControlLabel
          control={<Switch checked={switchState.descriptionChecked} onChange={handleChange} name="descriptionChecked" />}
          label="Description"
        />
        <Autocomplete
          freeSolo
          ChipProps
          multiple
          style={{ width: 500 }}
          options={resources.map((resource) => resource.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
          )}
          onKeyDown={handleSubmit}
        />
      </FormGroup>
    </div>
  );
};

export default SearchBar;
