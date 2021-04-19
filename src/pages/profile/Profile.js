import React, { Component } from 'react';
import Footer from 'components/footer/Footer';
import Header from "components/header/Header";
import {View} from 'react-native';
import { Redirect } from "react-router-dom";
import { getSavedResourcesWithUID, getMultipleResourceWithIDS} from 'firebase_components/firebase_db'
import CardContainer from 'components/card_container/CardContainer'
import "./Profile.css"

// Step1: check whether the user is logged in
// Step2: Load the user related data

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.location.state.uid
    };
  }

  componentDidMount() {
    var firebase = require('firebase');
    var auth = firebase.auth();
    if(auth.currentUser == null || auth.currentUser.uid !== this.state.uid) {
      this.setState({
        illegal: true
      })
    } else {
      getSavedResourcesWithUID(this.state.uid, (ids) => {this.setState({resourceIDs: ids})});
    }
  }


  // redirect_helper() {
  //   this.props.history.push('/profile');
  // }



  render() {
    if (this.state.illegal === true) {
      return <Redirect to={{
        pathname: "/",
      }} />;
    }
    var saved;
    if(this.state.resourceIDs != null) {
      saved = (
        <CardContainer containerType="saved" resourceIDs={this.state.resourceIDs}/>
      )
    }
    return (
      <div id="home">
        <View style={{flex: 1}}>
            <Header />
            <div id="profile-body">
              <h3>personal info</h3>
              <ul>
                  <li>profile photo</li>
                  <li>name</li>
                  <li>email</li>
                  <li>affiliation</li>
              </ul>
              <h3>saved resources</h3>
              <ul>
                  <li>filter bar</li>
                  <li>card container component</li>
              </ul>
              <h3>upload</h3>
              <p>we welcome feedback and additional resources to be emailed to us at ludi@illinois.edu</p>
              {saved}
            </div>
            <Footer />
        </View>
        
      </div>
    );
  }
  
}