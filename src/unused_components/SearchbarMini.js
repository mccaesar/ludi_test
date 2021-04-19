import React, { Component } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './SearchBarMini.css';
import { Redirect } from "react-router-dom";
import { get_autoComplete} from '../firebase_db'

const fieldNames = ['Name', 'Author', 'Tags', 'Description']
export default class SearchBarMini extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInfo: null,
            options:[],
            Name: true,
            Description: true,
            Tags: true,
            Author: true
        }
        get_autoComplete(this.setAutoCompleteOptionsState);
    }

    setAutoCompleteOptionsState = (options) => {
        this.setState({
            ...this.state,
            options: options
        })
    }

    submitBtOnClick = () => {
        let searchInfo = this.constructSearchInfo();
        if (this.props.redirect == null) {
            this.props.setSearchInfoState(searchInfo);
        } else {
            this.setState({
                ...this.state,
                searchInfo: searchInfo
            })
        }
    }

    // extract searchString and fields to search from the form
    // return SearchInfo as an object
    constructSearchInfo = () => {
        let searchInfo = {};
        searchInfo.searchString = document.getElementById('search_input').value;
        searchInfo.searchedFields = [];
        fieldNames.forEach(element => {
            this.addSearchFieldsHelper(element, searchInfo.searchedFields)
        });
        return searchInfo;
    }

    addSearchFieldsHelper = (fieldName, list) => {
        if (this.state[fieldName]) {
            list.push(fieldName);
        }
    }

    handleChangedCheckbox = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    }
    
	render () {
        if (this.state.searchInfo != null && this.props.redirect != null) {
            return <Redirect to={{
                pathname: "/results",
                state: { searchInfo: this.state.searchInfo }
            }} />;
        }
        let searchedFields = [];
        fieldNames.forEach(element => {
            searchedFields.push(
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state[element]}
                            name={element}
                            color="primary"
                            id={element}
                            onChange={this.handleChangedCheckbox}
                        />
                    }
                    label={element}
                    key={element}
                />
            )
        });
		return (
			<div className="App-search">
                <Autocomplete
                    size="small"
                    freeSolo
                    fullWidth
                    id="search_input"
                    options={this.state.options}
                    renderInput={(params) => (
                        <TextField {...params} label={<span style={{ fontSize: '0.75rem' }}>search</span>} margin="normal" variant="outlined" />
                    )}
                    onKeyDown={e => {
                        if (e.keyCode === 13) {
                            this.submitBtOnClick();
                        }
                    }}
                />
            </div>
		);
    }
};