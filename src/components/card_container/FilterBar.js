import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './FilterBar.css';
import { FormGroup } from '@material-ui/core';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class FilterBar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          filterName: ''
      };
  }

  handleChange = (event) => {
    // const selectedName = event.target.name; 
    const value = event.target.value;

    this.props.updateContainerState(value);
    
    this.setState({
      filterName: value,
      //[selectedName]: event.target.value
    });
    
  };



  // //written to dynamically add dropdown options (not working)
  // addOptions = () => {
  //   let OptionsList = ["item1", "item2"];
  //   let dd = document.getElementById('filterID');
  //   console.log(dd);
  //   let moreOptions;

  //   for (var i = 0; i < OptionsList.length; i++) { 
  //       var optn = OptionsList[i]; 
  //       var element = document.createElement("option"); 
  //       element.textContent = optn; 
  //       element.value = optn; 
  //       dd.appendChild(element);
  //   }
  //   return;
  // }


  render() {
    if(this.props.containerType === "recommended")//return null for certain containerTypes
    {
      return null;
    }


    const { classes } = this.props;

    //set what results statement to display based on container type
    let resultsStatement;
    switch(this.props.containerType) {
      case 'resultsContainer':
        if (this.props.numResults === 1) {
          resultsStatement = (
            <div> { this.props.numResults } result found. </div>
          );
        } else {
          resultsStatement = (
            <div> { this.props.numResults } results found. </div>
          );
        }
        break;
      case 'saved':
        if (this.props.numResults === 1) {
          resultsStatement = (
            <div> { this.props.numResults } saved resource. </div>
          );
        } else {
          resultsStatement = (
            <div> { this.props.numResults } saved resources. </div>
          );
        }
        break;
      case 'recommended': //filterBar not displayed
        resultsStatement = (
            <div>  </div>
        );
        break;
      default:
        resultsStatement = (
            <div>  </div>
        );

        break;

    }





    
    let optionsList = [];
    //set which filter options are available based on container type
    switch(this.props.containerType) {
      case 'resultsContainer':
        //optionsList.push(<option value="relevance">Most relevant</option>);
        optionsList.push(<option value="alphabetical">Alphabetical (A-Z)</option>);
        optionsList.push(<option value="alphabeticalReverse">Alphabetical (Z-A)</option>);
        optionsList.push(<option value="date">Date added (newest)</option>);
        optionsList.push(<option value="dateReverse">Date added (oldest)</option>);
        break;
      case 'saved':
        optionsList.push(<option value="alphabetical">Alphabetical (A-Z)</option>);
        optionsList.push(<option value="alphabeticalReverse">Alphabetical (Z-A)</option>);
        break;
      case 'recommended': //filterBar not displayed
        //shouldn't get here
        break;
      default:
        break;
    }

    return (

      <FormControl variant="outlined" className={classes.formControl} id="body">
        <FormGroup>
          <InputLabel htmlFor="outlined-age-native-simple">sort by</InputLabel>

          {/* select */}
          <Select
              id = "filterID"
              native
              value= { this.state.filterName }
              onChange= { this.handleChange }
              label="sort by"
              inputProps={{
                    name: 'sort by',
                    id: 'outlined-age-native-simple',
              }}
          >
            {/* value controls event.target.value on change and last field is what's displayed*/}
            {/*removed: <option aria-label="None" value="" /> */}

            { optionsList }
            
          </Select>
          {/* this.addOptions() */}

          <div>{resultsStatement}</div>
        </FormGroup> 
      </FormControl>

    )
  }
}

export default withStyles(styles)(FilterBar);
