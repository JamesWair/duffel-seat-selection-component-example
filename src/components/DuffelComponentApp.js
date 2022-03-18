import React, { useState } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

import { SeatSelection, AdditionalBaggageSelection } from "@duffel/components";
import "@duffel/components/dist/SeatSelection.min.css";
import "@duffel/components/dist/AdditionalBaggageSelection.min.css";

import DATA from "../services/data.service";

const INITIAL_PASSENGERS = DATA.PASSENGERS;
const INITIAL_SEAT_MAPS = DATA.SEAT_MAPS.data;
const INITIAL_OFFER = DATA.OFFER.data;

export default function DuffelComponentApp() {
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [seatSelection, setSeatSelection] = useState([]);

  const [showBags, setShowBags] = useState(false);
  const [additionalBaggage, setAdditionalBaggage] = useState([]);

  const [passengers, setPassengers] = useState(INITIAL_PASSENGERS);
  const [seatMaps, setSeatMaps] = useState(INITIAL_SEAT_MAPS);
  const [offer, setOffer] = useState(INITIAL_OFFER);

  function toggleShowSeatMap() {
    setShowSeatMap(!showSeatMap);
  }

  function toggleShowBags() {
    setShowBags(!showBags);
  }

  function handleClose() {
    setShowSeatMap(false);
    setShowBags(false);
  }

  function onSubmitFn(e) {
    setSeatSelection(e);
    handleClose();
  }

  function onSubmitFnBag(e) {
    setAdditionalBaggage(e);
    handleClose();
  }

  function handlePassengerInputChange(e) {
    setPassengers(JSON.parse(e.target.value));
  }

  function handleSeatMapsInputChange(e) {
    setSeatMaps(e.target.value);
  }

  function handleOfferInputChange(e) {
    setOffer(e.target.value);
  }

  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
            <span role="img" aria-label="plane and palm tree">
              Duffel Components 🛫 &#127796;
            </span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row style={{ margin: "40px 0" }}>
          <Col>
            <Row>
              <h1>
                Seat Selector{" "}
                <span role="img" aria-label="seat">
                  💺
                </span>
              </h1>
              <p className="text-muted">
                Click the button below to open the seat selection modal.
              </p>
              <Button
                variant="success"
                className="m-auto"
                onClick={toggleShowSeatMap}
              >
                Show Seat Map!
              </Button>
            </Row>
            <hr />
            <Row>
              <h1>
                Additional Baggage{" "}
                <span role="img" aria-label="bag">
                  🛄
                </span>
              </h1>
              <p className="text-muted">
                Click the button below to open the additional baggage modal.
              </p>
              <Button
                variant="success"
                className="m-auto"
                onClick={toggleShowBags}
              >
                Show Extra Bags!
              </Button>
            </Row>
            <hr />
            <Row>
              <Form>
                <h2>Outputs</h2>
                <p className="text-muted">
                  This is the data output by the seat selection component.
                </p>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea3"
                >
                  <Form.Label>Selected Seats</Form.Label>
                  <Form.Control
                    as="textarea"
                    disabled={true}
                    rows={6}
                    value={JSON.stringify(seatSelection, null, 4)}
                  />
                </Form.Group>
                <p className="text-muted">
                  This is the data output by the additional baggage component.
                </p>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea3"
                >
                  <Form.Label>Additional Bags</Form.Label>
                  <Form.Control
                    as="textarea"
                    disabled={true}
                    rows={6}
                    value={JSON.stringify(additionalBaggage, null, 4)}
                  />
                </Form.Group>
              </Form>
            </Row>
          </Col>
          <Col>
            <h1>Data</h1>
            <h2>Inputs</h2>
            <p className="text-muted">
              All input data is editable but is not validated on input. Initial
              state is an example offer. Refreshing the page will re-load the
              example.
            </p>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Passengers</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  onChange={handlePassengerInputChange}
                  value={JSON.stringify(passengers, null, 4)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea2"
              >
                <Form.Label>Offer</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  onChange={handleOfferInputChange}
                  value={JSON.stringify(offer, null, 4)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea3"
              >
                <Form.Label>Seat Maps</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  onChange={handleSeatMapsInputChange}
                  value={JSON.stringify(seatMaps, null, 4)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Modal show={showSeatMap} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Seat Map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SeatSelection
              offer={offer}
              seatMaps={seatMaps}
              passengers={passengers}
              onSubmit={onSubmitFn}
            />
          </Modal.Body>
        </Modal>
        <Modal show={showBags} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Extra Bags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <AdditionalBaggageSelection
                offer={offer}
                passengers={passengers}
                onSubmit={onSubmitFnBag}
              />
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
