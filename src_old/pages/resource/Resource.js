import React from 'react';
import Description from './components/Description';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Overview from './components/Overview';
import Guidance from './components/Guidance';
import { Helmet } from 'react-helmet';
import { getResourceWithID } from 'firebase_components/firebase_db';
import CardContainer from 'components/card_container/CardContainer';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      searchInfo: {
        searchString: this.props.match.params.productID,
        searchedFields: ['Title', 'Description', 'Tags', 'Author'],
      },
    };
  }

  setDataState = (data) => {
    this.setState({
      ...this.state,
      data: data,
    });
  };

  componentDidMount() {
    getResourceWithID(this.props.match.params.productID, this.setDataState);
  }

  saveResources = () => {
    // check whether user is logged in
    var firebase = require('firebase');
    var auth = firebase.auth();
    if (auth.currentUser == null) {
      alert("You can't save a resource unless you are logged in");
      return;
    }
    // check whether user id is already in the database
    var path = 'users'; // this is the path of the spreadsheet data
    var dataRef = firebase.database().ref(path);
    // if user is not in the database, add it to the database
    var productID = this.props.match.params.productID;
    dataRef.once('value').then((dataSnapshot) => {
      if (dataSnapshot.hasChild(auth.currentUser.uid)) {
        // /user/uid is in database
        var pathToUserSavedRelative = auth.currentUser.uid + '/savedResources';
        var pathToUserSavedComplete =
          'users/' + auth.currentUser.uid + '/savedResources';
        if (dataSnapshot.hasChild(pathToUserSavedRelative)) {
          // /user/uid/savedResources is in database
          let currSaved = dataSnapshot.child(pathToUserSavedRelative).val();
          currSaved.push(productID);
          let savedResourcesRef = firebase
            .database()
            .ref(pathToUserSavedComplete);
          savedResourcesRef.set(currSaved);
        } else {
          // /user/uid/savedResources is not in database
          let currSaved = [productID];
          let savedResourcesRef = firebase
            .database()
            .ref(pathToUserSavedComplete);
          savedResourcesRef.set(currSaved);
        }
      } else {
        // /user/uid is not in database
        let currUserRef = firebase
          .database()
          .ref('users/' + auth.currentUser.uid);
        let userObject = {
          savedResources: [productID],
          displayName: auth.currentUser.displayName,
        };
        currUserRef.set(userObject);
      }
      alert('this resource is saved.');
    });
    // check whether user has saved this resource

    // save the resource
  };

  render() {
    if (this.state.data != null) {
      return (
        <div class="page-container">
          <div className="App" class="content-wrap">
            <Helmet>
              <title>LUDI | {this.state.data.Title}</title>
            </Helmet>
            <Header />
            <Overview
              website={this.state.data.Website}
              title={this.state.data.Title}
              author={this.state.data.Author}
              download={this.state.data.DownloadorSignUp}
              tags={this.state.data.Tags}
              saveResources={this.saveResources}
            />
            <Description description={this.state.data.Description} />
            <BookmarkBorderIcon onClick={(e) => this.saveResources()} />
            <Guidance
              potentialUseCase={this.state.data.PotentialUseCase}
              pros={this.state.data.Pros}
              cons={this.state.data.Cons}
            />
            <CardContainer
              containerType="recommended"
              searchInfo={this.state.searchInfo}
            />
          </div>
          <Footer />
        </div>
      );
    } else {
      return null;
    }
  }
}
