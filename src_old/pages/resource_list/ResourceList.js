import React, { Component } from 'react';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import CardContainer from 'components/card_container/CardContainer';
import SearchBar from 'components/search_bar/SearchBar';
import 'App.css';

export default class Results extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state != null) {
      // if user is redirected to this page from the home page
      this.state = {
        searchInfo: this.props.location.state.searchInfo,
      };
    } else {
      // if the user is currently inside results page
      this.state = {
        searchInfo: null,
      };
    }
  }

  setSearchInfoState = (searchInfo) => {
    this.setState({
      searchInfo: searchInfo,
    });
  };

  render() {
    return (
      <div class="page-container">
        <div id="results" class="content-wrap">
          <Header />
          <SearchBar
            searchInfo={this.state.searchInfo}
            setSearchInfoState={this.setSearchInfoState}
          />
          <CardContainer
            containerType="resultsContainer"
            searchInfo={this.state.searchInfo}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
