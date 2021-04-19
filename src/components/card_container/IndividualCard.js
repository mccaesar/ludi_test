import Button from '@material-ui/core/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './IndividualCard.css';

export default class IndividualCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
        console.log("card title", this.props.item.title)
    }

    renderRedirect() {
        if(this.state.redirect != null) {
            return (
                <Redirect to={{
                    pathname: this.state.redirect + '/' + this.props.item.title,
                    state: { resource: this.props.item }
                }} />
            )
        }
    }
    

    render() {
        let link = "/product/" + this.props.item.title;
        return ( 
        <Col xs={6} md={4}>
            <Card id="card">
                <Card.Body>
                    <Card.Title>{this.props.item.title}</Card.Title>
                    <Card.Text>{this.props.item.description}</Card.Text>
                    <Button variant="outlined" 
                            color="primary" 
                            // onClick={()=> { this.setState({ redirect: "/product"}) }}
                            href={link}
                            id="card-button">
                        learn more
                    </Button>
                    {this.renderRedirect()}
                </Card.Body>
            </Card>
        </Col>
        );
    }
}