import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Countdown from 'react-countdown-now';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRSVP: false,
      showQuestion: false,
      ticketNo: '',
      fullName: '',
      guest: '',
      baby: '',
      guestName: '',
      vegan: false,
      other: '',
      edit: false,
      showModal: false,
    };

    this.toggleRSVP = this.toggleRSVP.bind(this);
    this.findTicket = this.findTicket.bind(this);
    this.ticketOnChange = this.ticketOnChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.confirmBooking = this.confirmBooking.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }


  toggleRSVP() {
    const current = this.state.showRSVP;
    this.setState({
      showRSVP: !current
    });
  }

  ticketOnChange(event) {
    this.setState({ticketNo: event.target.value});
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  findTicket() {
    fetch("/invitation/" + this.state.ticketNo)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.rowCount === 0) {
            toast.error('🦉🦉🦉🦉 Cannot find your ticket... Ticket Number is on the left side of your ticket. Please try again! 🧙🧙🧙🧙', {position: toast.POSITION.BOTTOM_RIGHT});
          } else {
            const detail = result.rows[0];
            this.setState({
              fullName: detail.fullname,
              showQuestion: true,
              edit: detail.time !== null,
              baby: detail.baby,
              guest: detail.guest,
              guestName: detail.guestname ? detail.guestname : '',
              vegan: detail.vegan,
              other: detail.other ? detail.other : ''
            });

          }
        }
      );
  }

  confirmBooking() {
    axios.post(`/invitation`, { input: this.state })
      .then(res => {
        if (res.data.rowCount === 1) {
          toast.success('🦉🦉🦉🦉 Your booking has been confirmed. You can edit it by entering the Ticket No again. 🧙🧙🧙🧙', {position: toast.POSITION.BOTTOM_RIGHT});
          this.setState({
            showQuestion: false,
            showRSVP: false
          })
        }
      });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  render() {
    const renderer = ({days, hours, minutes, seconds, completed}) => {
      if (completed) {
        // Render a completed state
        return (<div> Wedding is Today! </div>);
      } else {
        return <span>{days} Days, {hours} Hours, {minutes} Mins, {seconds} Secs</span>;
      }
    };
    return (
      <>
        <div className="content">
          <div className="welcome">
            <div className="photo-mobile">
              <div className="title-mobile"> Larry & Kimberly</div>
            </div>
            <div className="logo"/>
            <div className="location">
              Paletta Mansion
              <br/>
              Burlington
              <br/>
              Ontario
            </div>

            <div className="time">
              Sunday, July 7, 2019
              <br/>
              <Countdown
                date={new Date('2019-07-07')}
                renderer={renderer}
              />
            </div>
            <div className="button" onClick={this.toggleRSVP}>
              RSVP
            </div>
            {(this.state.showRSVP && !this.state.showQuestion) && (
              <div className="rsvp-content ticket-content">
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Ticket No.
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control onChange={this.ticketOnChange} type="text" placeholder="Left side of the ticket"/>
                    </Col>
                  </Form.Group>
                  <Button variant="secondary" className="float-right find-button" onClick={this.findTicket}>Manage My Reservation</Button>
                  <Button variant="info"  className="float-right" onClick={this.openModal}>Need Help?</Button>
                </Form>
              </div>
            )}

            {this.state.showQuestion && (
              <div className="rsvp-content question-content">
                { !this.state.edit && (<div>Welcome To The Journey, {this.state.fullName}! </div>)}
                { this.state.edit && (<div>Welcome Back {this.state.fullName}! Below Are Your Booking Details. </div>)}
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Accompany Guests?
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control type="number" name="guest" min="0" onChange={this.handleInputChange}
                                    value={this.state.guest} placeholder="Not Including Yourself"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Kids Or Babies?
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control type="number" min="0" name="baby" placeholder="Number Of Kids Meals"
                                    value={this.state.baby} onChange={this.handleInputChange}/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Their Names?
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          name="guestName"
                          onChange={this.handleInputChange} value={this.state.guestName}
                          placeholder="Let us know about guest's full name."
                        />
                      </Form.Group>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Diet Restriction?
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Group controlId="vegan" className="diet-option">
                        <Form.Check type="checkbox" name="vegan" checked={this.state.vegan}
                                    onChange={this.handleInputChange} label="Vegan or Vegetarian"/>
                      </Form.Group>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                     Other
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Group>
                        <Form.Control
                          value={this.state.other}
                          as="textarea"
                          name="other"
                          rows="8"
                          onChange={this.handleInputChange}
                          placeholder="Let us know about other diet restrictions. Or if you need help with transportation or accommodation"
                        />
                      </Form.Group>
                    </Col>
                  </Form.Group>
                  <Button variant="secondary" className="float-right" onClick={this.confirmBooking}>Confirm My Booking</Button>
                </Form>
              </div>

            )}
          </div>
          { (!this.state.showRSVP && !this.state.showQuestion) && (
            <div className="schedule">
              <div className="schedule-title">
                Your Magical Adventure Timeline
              </div>
              <div className="activity">
                <div> 3:00 PM - Guests Arrival </div>
                <div> 3:30 PM - Ceremony </div>
                <div> 4:00 PM - Cocktail Hour </div>
                <div> 5:00 PM - Dinner </div>
                <div> 7:45 PM - First Dance </div>
                <div> 8:15 PM - Cake, Late Night Station </div>
              </div>

              <div className="travel-title">
                Need Help Finding 9 3/4 Platform? Please Indicate In Your Booking Details.
              </div>
            </div>
          ) }
        </div>
        <div className="photo">
          <div className="title">Larry & Kimberly</div>
        </div>
        <ToastContainer />

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>How to find my Ticket No.?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="sample-tt" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Home;
