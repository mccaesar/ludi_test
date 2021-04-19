import React, { Component } from 'react';
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import TextField from '@material-ui/core/TextField';
import {View} from 'react-native';
import { FormControl } from '@material-ui/core';
// import "./Upload.css"

export default class Home extends Component {
  redirect_helper() {
    this.props.history.push('/upload');
  }

  render() {
    return (
      <div id="home">
        <View style={{flex: 1}}>
            <Header />
            <FormControl>
                <TextField
                    id="title"
                    placeholder="title"
                    variant="outlined"
                />
                <TextField
                    id="description"
                    placeholder="description"
                    multiline
                    rows={4}
                    variant="outlined"
                />
            </FormControl>
            <Footer />
        </View>
      </div>
    );
  }
  
}