import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FilterBar from './FilterBar';
import Row from 'react-bootstrap/Row';
import './CardContainer.css';
import IndividualCard from './IndividualCard';
import {
  search_with_keywords,
  getMultipleResourceWithIDS,
} from 'firebase_components/firebase_db';
import ResourceDataService from 'services/resource.service';

export default class CardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //ID: this.props.id, //using prop containerType now
      firstCardIdx: this.props.containerType === 'recommended' ? 1 : 0, //for recommended, dont display the first card (the exact match)
      maxCards: this.setMaxCards(this.props.containerType),
      searchInfo: this.props.searchInfo,
      data: null,
      filter: 'relevance',
    };
    // if (this.props.searchInfo != null) {
    //     search_with_keywords(this.props.searchInfo.searchString, this.setDataState, this.props.searchInfo.searchedFields);
    // } else if(this.props.resourceIDs != null) {
    //     getMultipleResourceWithIDS(this.props.resourceIDs, this.setDataState);
    // }

    //console.log("CardContainer data", this.state.data);
  }

  componentDidMount() {
    if (this.props.searchInfo != null) {
      this.setDataState(
        this.local_search_with_keywords(
          this.props.searchInfo.searchString,
          this.setDataState,
          this.props.searchInfo.searchedFields
        )
      );
    } else if (this.props.resourceIDs != null) {
      getMultipleResourceWithIDS(this.props.resourceIDs, this.setDataState);
    }
    //this.setState({});
  }

  setMaxCards(containerType) {
    let max = 1000;

    switch (containerType) {
      case 'resultsContainer':
        return max;
      case 'saved':
        return max;
      case 'recommended':
        return 4; //for recommended, diplays 1 through 4 (3 reccomendations)
      default:
        return max;
    }
  }

  getResources(callback) {
    ResourceDataService.getAll()
      .then((response) => {
        // console.log(response.data);
        callback(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  local_search_with_keywords(
    search_input,
    callback,
    target_fields = [
      'Title',
      'Tags',
      'Categorization',
      'Author',
    ] /**search options */
  ) {
    var done = false;
    for (var i = 0; i < target_fields.length; i++) {
      target_fields[i] =
        target_fields[i][0].toLowerCase() + target_fields[i].substring(1);
    }

    search_input = search_input.toLowerCase();

    ///\W / filters out special characters besides space
    // replaces all non-word charachters (except space) with ''
    var keys = search_input.replace(/(?![ ])[\W]/g, '').split(' ');

    // var allResources = getResources();
    // console.log(allResources);
    // console.log(typeof allResources);
    let getSearchResults = (search_results) =>
      this.getResources(function (allResources) {
        //console.log(allResources);

        //var search_results = []; // empty the results
        allResources.map((resource) => {
          //console.log(resource);
          // search for the entire string
          var found = false;
          for (var i = 0; i < target_fields.length; i++) {
            //console.log(resource[target_fields[i]]);
            if (
              resource[target_fields[i]].toLowerCase().includes(search_input)
            ) {
              found = true;
              break;
            }
          }
          // if current row has a match, found = true now

          // 2. search with the individual words in the search string
          if (!found) {
            // search for the string
            for (i = 0; i < target_fields.length; i++) {
              for (var j = 0; j < keys.length; j++) {
                var search_input_substr = keys[j];
                //for small substrings in the search term, adding " " checks that the match is it's own word
                if (search_input_substr.length < 3) {
                  search_input_substr = search_input_substr + ' ';
                }
                if (
                  resource[target_fields[i]]
                    .toLowerCase()
                    .includes(search_input_substr)
                ) {
                  found = true;
                  break;
                }
              }
            }
          }
          if (found) {
            search_results.push(resource);
          }
        });
        // console.log("internal search results", search_results);
        // console.log("internal search results type: ", typeof search_results);
        done = true;
      });
    // ResourceDataService.getAll()
    // .then(response => {
    //     console.log(response.data);
    //     allResources = response.data
    //     console.log(allResources);
    // })
    // .catch(e => {
    // console.log(e);
    // });

    var search_results_output = [];
    getSearchResults(search_results_output);

    // console.log("called search_with_keywords")
    // console.log("search results", search_results_output);
    // console.log("search results type: ", typeof search_results_output);

    return search_results_output;
  }

  setDataState = (inData, inDone) => {
    //console.log("inData", inData);
    //console.log("db finished? ", inDone);
    this.setState(
      {
        data: inData,
      },
      console.log('set state to ', this.state.data)
    );

    //console.log("data title ", inData[0]);
    //inData.map(resource => (
    //    console.log("resource title", resource.title)
    //));
  };

  setFilterState = (filterName) => {
    this.filterResults(filterName);
    this.setState({
      filter: filterName,
    });
  };

  setSearchState = (newSearchInfo) => {
    this.setState({
      searchInfo: newSearchInfo,
    });
  };

  filterResults = (filterName) => {
    if (this.state.filter === filterName) {
      return;
    }
    console.log(filterName);
    //this.state.data.
    switch (filterName) {
      case 'relevance':
        // use this.props.searchInfo.searchString ?
        return;
      case 'alphabetical':
        this.state.data.sort((a, b) =>
          a['title'].toLowerCase() > b['title'].toLowerCase() ? 1 : -1
        );
        return;
      case 'alphabeticalReverse':
        this.state.data.sort((a, b) =>
          a['title'].toLowerCase() < b['title'].toLowerCase() ? 1 : -1
        );
        return;
      case 'date':
        //this.state.data.sort((a,b) => (a['Title'].toLowerCase() < b['Title'].toLowerCase()) ? 1 : -1);
        this.state.data.sort((a, b) =>
          a['dateAdded'].substring(0, 10) < b['dateAdded'].substring(0, 10)
            ? 1
            : -1
        );
        console.log(this.state.data[1]);
        console.log(filterName, 'done');
        return;
      case 'dateReverse':
        this.state.data.sort((a, b) =>
          a['dateAdded'].substring(0, 10) > b['dateAdded'].substring(0, 10)
            ? 1
            : -1
        );
        console.log(filterName, 'done');
        return;
      default:
        return;
    }
  };

  // shouldComponentUpdate(nextProps, nextState){

  // }
  render() {
    // check if need to initiate a new search of database
    if (this.props.searchInfo !== this.state.searchInfo) {
      console.log('SearchInfo changed, searching database again.');
      search_with_keywords(
        this.props.searchInfo.searchString,
        this.setDataState,
        this.props.searchInfo.searchedFields
      );
      this.setSearchState(this.props.searchInfo);
    }

    if (this.state.data == null) {
      console.log('data == null');
      return <div></div>;
    }
    //console.log("data at render", this.state.data);
    // let filterBar;
    // switch(this.props.containerType) {
    //     case 'resultsContainer':
    //         filterBar = <FilterBar containerType={this.props.containerType} numResults={this.state.data.length} updateContainerState={this.setFilterState} /> ;
    //         break;
    //     case 'saved':
    //         filterBar = <FilterBar containerType={this.props.containerType} numResults={this.state.data.length} updateContainerState={this.setFilterState} /> ;;
    //         break;
    //     case 'recommended':
    //         filterBar = <div></div>;
    //         break;
    //     default:
    //         filterBar = <div></div>;
    // }

    return (
      <div id="cardcontainer">
        {/* Current filter is { this.state.filter }  */}
        <Container>
          {console.log('render data', this.state.data)}
          {console.log('render data[0]', this.state.data[0])}
          {console.log(
            'render Object.values(data)',
            Object.getOwnPropertyNames(this.state.data)
          )}
          {console.log('render data type', typeof this.state.data)}
          {console.log('render data length', this.state.data.length)}

          <FilterBar
            containerType={this.props.containerType}
            numResults={this.state.data.length}
            updateContainerState={this.setFilterState}
          />
          <Row class="show-grid">
            <Col lg={12}>
              <Row class="show-grid">
                {
                  //{ /*this.state.data.map((resource) => <IndividualCard item={resource}></IndividualCard>) */}

                  this.state.data
                    .slice(this.state.firstCardIdx, this.state.maxCards)
                    .map((item) => (
                      <IndividualCard item={item}></IndividualCard>
                    ))
                }
                {console.log('render data2', this.state.data)}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
