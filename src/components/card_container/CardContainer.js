import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FilterBar from'./FilterBar';
import Row from 'react-bootstrap/Row';
import './CardContainer.css';
import IndividualCard from './IndividualCard';
import {search_with_keywords, getMultipleResourceWithIDS} from 'firebase_components/firebase_db'

export default class CardContainer extends Component{
    constructor(props) {
        super(props);

        this.state = ({
            //ID: this.props.id, //using prop containerType now
            firstCardIdx: (this.props.containerType==='recommended' ? 1 : 0),//for recommended, dont display the first card (the exact match)
            maxCards: this.setMaxCards(this.props.containerType),
            searchInfo: this.props.searchInfo,
            data: null,
            filter: "relevance"
        });
        // if (this.props.searchInfo != null) {
        //     search_with_keywords(this.props.searchInfo.searchString, this.setDataState, this.props.searchInfo.searchedFields);
        // } else if(this.props.resourceIDs != null) {
        //     getMultipleResourceWithIDS(this.props.resourceIDs, this.setDataState);
        // }

    //console.log("CardContainer data", this.state.data);
    }

    componentDidMount() {
        if (this.props.searchInfo != null) {
            search_with_keywords(this.props.searchInfo.searchString, this.setDataState, this.props.searchInfo.searchedFields);
        } else if(this.props.resourceIDs != null) {
            getMultipleResourceWithIDS(this.props.resourceIDs, this.setDataState);
        }

    }

    setMaxCards(containerType) {
        let max = 1000;

        switch(containerType) {
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

    setDataState = (inData) => {
        //console.log("inData", inData);
        this.setState({
            data: inData
        });
        //console.log("data", this.state.data);
        
    }

    setFilterState = (filterName) => {
        this.filterResults(filterName)
        this.setState({
            filter: filterName});
    }

    filterResults = (filterName) => {
        if(this.state.filter === filterName) {
            return;
        }
        console.log(filterName);
        //this.state.data.
        switch (filterName) {
            case 'relevance':
                // use this.props.searchInfo.searchString ?
                return;
            case 'alphabetical':
                this.state.data.sort((a,b) => (a['title'].toLowerCase() > b['title'].toLowerCase()) ? 1 : -1);
                return;
            case 'alphabeticalReverse':
                this.state.data.sort((a,b) => (a['title'].toLowerCase() < b['title'].toLowerCase()) ? 1 : -1);
                return;
            case 'date':
                //this.state.data.sort((a,b) => (a['Title'].toLowerCase() < b['Title'].toLowerCase()) ? 1 : -1);    
                this.state.data.sort((a,b) => (a['dateAdded'].substring(0,10) < b['dateAdded'].substring(0,10)) ? 1 : -1);
                console.log(this.state.data[1]);
                console.log(filterName, "done");
                return;
            case 'dateReverse':
                this.state.data.sort((a,b) => (a['dateAdded'].substring(0,10) > b['dateAdded'].substring(0,10)) ? 1 : -1);
                console.log(filterName, "done");
                return;
            default:
                return;
        }

    }



    render() {
        // check if need to initiate a new search of database
        if(this.props.searchInfo !== this.state.searchInfo) {
            search_with_keywords(this.props.searchInfo.searchString, this.setDataState, this.props.searchInfo.searchedFields);
        }

        if (this.state.data == null) {
            console.log("data == null");
            return (<div></div>);
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
            <div id = "cardcontainer">

                {/* Current filter is { this.state.filter }  */}
                <Container>
                    {console.log("render data length", this.state.data.length)}
                    {console.log("render data", this.state.data)}

                    <FilterBar containerType={this.props.containerType} numResults={this.state.data.length} updateContainerState={this.setFilterState} /> 
                    <Row class="show-grid">
                        <Col lg={12}>
                            <Row class="show-grid">
                                {
                                    
                                    this.state.data.map((resource) => <IndividualCard item={resource}></IndividualCard>)
                                   // this.state.data.slice(this.state.firstCardIdx,this.state.maxCards).map((item) => <IndividualCard item={item}></IndividualCard>)
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
