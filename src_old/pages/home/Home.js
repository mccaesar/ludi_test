import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
// import Footer from "components/footer/Footer";
import Header from 'components/header/Header';
import SearchBar from 'components/search_bar/SearchBar';

export default class Home extends Component {
  redirect_helper() {
    this.props.history.push('/results');
  }

  render() {
    return (
      <div id="home">
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Header />
            <SearchBar redirect="/results" />
            <div id="tagline">
              <i>
                Search hundreds of resources for teaching and learning computer
                science
              </i>
            </div>
          </ScrollView>
        </View>
      </div>
    );
  }
}
