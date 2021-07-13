import React, { Component } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { get_autoComplete } from 'firebase_components/firebase_db';
import { Redirect } from 'react-router-dom';
import './SearchBar.css';
import TextField from '@material-ui/core/TextField';

const fieldNames = ['Title', 'Author', 'Tags', 'Description'];
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    if (this.props.searchInfo == null) {
      this.state = {
        searchInfo: null,
        options: [],
        Title: true,
        Description: true,
        Tags: true,
        Author: true,
      };
    } else {
      this.state = {
        searchInfo: this.props.searchInfo,
        options: this.props.searchInfo.searchedFields,
        Title: this.props.searchInfo.searchedFields.includes('Title'),
        Description:
          this.props.searchInfo.searchedFields.includes('Description'),
        Tags: this.props.searchInfo.searchedFields.includes('Tags'),
        Author: this.props.searchInfo.searchedFields.includes('Author'),
      };
    }
    get_autoComplete(this.setAutoCompleteOptionsState);
  }

  setAutoCompleteOptionsState = (options) => {
    this.setState({
      options: options,
    });
  };

  submitBtOnClick = () => {
    let searchInfo = this.constructSearchInfo();
    if (this.props.redirect == null) {
      this.props.setSearchInfoState(searchInfo);
    } else {
      this.setState({
        searchInfo: searchInfo,
      });
    }
  };

  // extract searchString and fields to search from the form
  // return SearchInfo as an object
  constructSearchInfo = () => {
    let searchInfo = {};
    searchInfo.searchString = document.getElementById('search_input').value;
    searchInfo.searchedFields = [];
    fieldNames.forEach((element) => {
      this.addSearchFieldsHelper(element, searchInfo.searchedFields);
    });
    return searchInfo;
  };

  addSearchFieldsHelper = (fieldName, list) => {
    if (this.state[fieldName]) {
      list.push(fieldName);
    }
  };

  handleChangedCheckbox = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  render() {
    if (this.state.searchInfo != null && this.props.redirect != null) {
      return (
        <Redirect
          to={{
            pathname: '/results',
            state: { searchInfo: this.state.searchInfo },
          }}
        />
      );
    }
    let searchedFields = [];
    fieldNames.forEach((element) => {
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
      );
    });
    var defaultValue =
      this.state.searchInfo == null ? '' : this.state.searchInfo.searchString;

    return (
      <div className="App-search">
        <FormGroup row>
          <Autocomplete
            defaultValue={defaultValue}
            freeSolo
            fullWidth
            id="search_input"
            options={this.state.options}
            renderInput={(params) => (
              <TextField
                {...params}
                label="search"
                margin="normal"
                variant="outlined"
              />
            )}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.submitBtOnClick();
              }
            }}
          />
          {searchedFields}
        </FormGroup>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.submitBtOnClick}
          id="search-button"
        >
          search
        </Button>
      </div>
    );
  }
}
