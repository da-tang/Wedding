import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'whatwg-fetch';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: [],
      show: false,
    };

    this.openRSVP = this.openRSVP.bind(this);
    this.closeRSVP = this.closeRSVP.bind(this);
  }

  openRSVP() {
    this.setState({
      show: true
    });
  }

  closeRSVP() {
    this.setState({
      show: false
    });
  }

  render() {
    return (
      <>
        <div className="photo">
          <div className="title"> Larry & Kimb324ly </div>
        </div>
        <div className="rsvp-content">
          <div className="welcome">
            <div className="logo" />
            <div className="form-container">
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm={6}>
                    Full Name
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control type="text" placeholder="Let us know who you are" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={6}>
                    Are you coming to celebrate?
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Control as="select">
                        <option>Absolutely</option>
                        <option>I'm so sad. I can't make it</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
