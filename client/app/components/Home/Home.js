import React, { Component } from 'react';
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
      showRSVP: false,
      showQuestion: false,
    };

    this.toggleRSVP = this.toggleRSVP.bind(this);
    this.findTicket = this.findTicket.bind(this);
  }

  toggleRSVP() {
    const current = this.state.showRSVP;
    this.setState({
      showRSVP: !current
    });
  }

  findTicket() {
    const current = this.state.showQuestion;
    this.setState({
      showQuestion: !current
    });
  }

  render() {
    return (
      <>
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
            <div className="button" onClick={this.toggleRSVP}>
              RSVP
            </div>
            { (this.state.showRSVP && !this.state.showQuestion) && (
              <div className="rsvp-content ticket-content">
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Ticket No.
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control type="text" placeholder="Left side of the ticket" />
                    </Col>
                  </Form.Group>
                  <Button variant="secondary" onClick={this.findTicket}>Find My Train Ticket</Button>
                </Form>
              </div>
            )}

            { this.state.showQuestion && (
              <div className="rsvp-content question-content">
                Welcome to the Journey, Piyush!
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Accompany guests?
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control type="number"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Kids or babies?
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control type="number"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Their Names?
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Group>
                        <Form.Control as="textarea" rows="3" placeholder="" />
                      </Form.Group>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Diet restriction?
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Group controlId="vegan" className="diet-option">
                        <Form.Check type="checkbox" label="Vegan or Vegetarian" />
                      </Form.Group>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4} />
                    <Col sm={8}>
                      <Form.Group>
                        <Form.Control as="textarea" className="diet-text" rows="3" placeholder="Let Us Know About Other Diet Restrictions" />
                      </Form.Group>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            )}
          </div>
        </div>
        <div className="photo">
          <div className="title"> Larry & Kimberly </div>
        </div>
      </>
    );
  }
}

export default Home;
