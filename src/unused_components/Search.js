import React, {Component} from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const filter = createFilterOptions();
const [value, setValue] = React.useState(null);
const opts = ['one','two','three']; 

export default class Search extends Component {

    render() {
        return (
            <div id="select">
                <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setValue({
                            title: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue({
                            title: newValue.inputValue
                        });
                    } else { setValue(newValue); }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `search "${params.inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="search-bar"
                options={opts}
                getOptionLabel={(option) => {
                    return option;
                }}
                renderOption={(option) => option}
                style={{ width: 200 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="search" variant="outlined" />
                )}
                />
            </div>
        )
    }
}