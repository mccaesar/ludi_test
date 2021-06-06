import React from 'react';
// import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
import './Footer.css';

const Footer = () => {
  return (
    <div id="footer">
      <Container fluid id="content">
        {/*
                <Row>
                    <Col md="6">
                        <h5 className="title">Footer Content</h5>
                            <p>text</p>
                    </Col>
                    <Col md="6">
                        <h5 className="title">Links</h5>
                        <ul>
                        <li className="list-unstyled">
                            <a href="#!">Link 1</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Link 2</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Link 3</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Link 4</a>
                        </li> 
                        </ul> 
                    </Col>
                </Row>*/}
      </Container>
      <div className="footer-copyright text-center py-3">
        <Container fluid>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a href="/"> ludi.illinois.edu </a>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
