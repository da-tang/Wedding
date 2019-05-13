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
    window.location.href = "/rsvp";
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
          <div className="title"> Larry & Kimberly </div>
        </div>
        <div className="content">
          <div className="welcome">
            <div className="logo" />
            <div className="location">
              Paletta Mansion
              <br />
              Burlington
              <br />
              Ontario
            </div>

            <div className="time">
              Sunday, July 7, 2019
            <br/>
              105 Days From Now
            </div>
            <div className="button" onClick={this.openRSVP}>
              RSVP
            </div>
          </div>
        </div>
        <Modal
          show={this.state.show}
          onHide={this.closeRSVP}
          style={{opacity:1}}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>RSVP</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeRSVP}>
              Close
            </Button>
            <Button variant="primary" onClick={this.closeRSVP}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Home;
