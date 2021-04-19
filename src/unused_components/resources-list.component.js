import React, { Component } from "react";
import ResourceDataService from "../services/resource.service";
import { Link } from "react-router-dom";

export default class ResourcesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      databaseItem: {
            title: "",
            description: "",
            longDescription: "",
            website: "",
            downloadorSignUp: "",
            author: "",
            categorization: "",
            tags: "",
            cost: "",
            openSource: "",
            dateAdded: "",
            potentialUseCases: "",
            strength: "",
            cons:""
      },
      resources: []
    };

    this.getResources();
    this.getResource("607a425ace11f045d98cf205");

  }

  getResources() {
    ResourceDataService.getAll()
    .then(response => {
    this.setState({
        resources: response.data
    });
    console.log(response.data);
    })
    .catch(e => {
    console.log(e);
    });
  }

  getResource(id) {
    ResourceDataService.get(id)
      .then(response => {
        this.setState({
          databaseItem: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  
//{this.state.resources['title'][0]}
//{this.state.resources.map(resource => <div>{resource.title}</div>)}
//{this.state.databaseItem["title"]}
//{this.state.databaseItem.title}
  render() {
    console.log(typeof this.state.resources);
    console.log(typeof this.state.databaseItem);
    console.log(this.state.databaseItem);
    console.log(this.state.databaseItem.title);

    return (
        <div>
            {this.state.databaseItem.description}
            
        
            
        </div>

    );
  }

}