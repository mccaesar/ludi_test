import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from "./reducer";
import fetchResources from '../api/api'
import "./CardContainer.css";

import IndividualCard from "./IndividualCard";
import Container from "react-bootstrap/Container";
import FilterBar from "./FilterBar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const CardContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchMovies()
      .then(jsonResponse => {
        dispatch({
          type: "FETCH_RESOURCES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

  const { resources, errorMessage, loading } = state;

  setMaxCards(containerType) {
    let max = 1000;

    switch (containerType) {
      case "resultsContainer":
        return max;
      case "saved":
        return max;
      case "recommended":
        return 4; //for recommended, diplays 1 through 4 (3 reccomendations)
      default:
        return max;
    }
  }

  setDataState = (inData, inDone) => {
    //console.log("inData", inData);
    //console.log("db finished? ", inDone);
    this.setState(
      {
        data: inData,
      },
      console.log("set state to ", this.state.data)
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
      case "relevance":
        // use this.props.searchInfo.searchString ?
        return;
      case "alphabetical":
        this.state.data.sort((a, b) =>
          a["title"].toLowerCase() > b["title"].toLowerCase() ? 1 : -1
        );
        return;
      case "alphabeticalReverse":
        this.state.data.sort((a, b) =>
          a["title"].toLowerCase() < b["title"].toLowerCase() ? 1 : -1
        );
        return;
      case "date":
        //this.state.data.sort((a,b) => (a['Title'].toLowerCase() < b['Title'].toLowerCase()) ? 1 : -1);
        this.state.data.sort((a, b) =>
          a["dateAdded"].substring(0, 10) < b["dateAdded"].substring(0, 10)
            ? 1
            : -1
        );
        console.log(this.state.data[1]);
        console.log(filterName, "done");
        return;
      case "dateReverse":
        this.state.data.sort((a, b) =>
          a["dateAdded"].substring(0, 10) > b["dateAdded"].substring(0, 10)
            ? 1
            : -1
        );
        console.log(filterName, "done");
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
      console.log("SearchInfo changed, searching database again.");
      search_with_keywords(
        this.props.searchInfo.searchString,
        this.setDataState,
        this.props.searchInfo.searchedFields
      );
      this.setSearchState(this.props.searchInfo);
    }

    if (this.state.data == null) {
      console.log("data == null");
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
          {console.log("render data", this.state.data)}
          {console.log("render data[0]", this.state.data[0])}
          {console.log(
            "render Object.values(data)",
            Object.getOwnPropertyNames(this.state.data)
          )}
          {console.log("render data type", typeof this.state.data)}
          {console.log("render data length", this.state.data.length)}

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
                {console.log("render data2", this.state.data)}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
