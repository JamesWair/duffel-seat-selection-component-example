import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';

import { SeatSelection } from '@duffel/components'
import DATA from "../services/data.sevice";


const INITIAL_PASSENGERS = DATA.PASSENGERS
const INITIAL_SEAT_MAPS = DATA.SEAT_MAPS.data
const INITIAL_OFFER = DATA.OFFER.data

export default function SeatSelectionApp() {

    const [showSeatMap, setShowSeatMap] = useState(false);
    const [seatSelection, setSeatSelection] = useState([]);
    const [passengers, setPassengers] = useState(INITIAL_PASSENGERS);
    const [seatMaps, setSeatMaps] = useState(INITIAL_SEAT_MAPS);
    const [offer, setOffer] = useState(INITIAL_OFFER);


    function toggleShowSeatMap() {
        setShowSeatMap(!showSeatMap)
    }

    function handleClose() {
        setShowSeatMap(false)
    }

    function onSubmitFn(e) {
        setSeatSelection(e)
        handleClose()
    }

    function handlePassengerInputChange(e) {
        setPassengers(JSON.parse(e.target.value))
    }

    function handleSeatMapsInputChange(e) {
        setSeatMaps(e.target.value)
    }

    function handleOfferInputChange(e) {
        setOffer(e.target.value)
    }

    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#home">🛫 &#127796;</Navbar.Brand>
                </Container>
            </Navbar>

            <Container>

                <Row style={{ margin: '40px 0' }}>
                    <Col>
                        <h1>Component: Seat Selector 💺</h1>
                        <p className="text-muted">Click the button below to open the seat selection modal.</p>
                        <Button variant='success' className='m-auto' onClick={toggleShowSeatMap}>Show Seat Map!</Button>
                    </Col>
                    <Col>
                        <h1>Data</h1>
                        <h2>Inputs</h2>
                        <p className="text-muted">All input data is editable but is not validated on input. Initial state is an example offer. Refreshing the pge will re-load the example.</p>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Passengers</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    onChange={handlePassengerInputChange}
                                    value={JSON.stringify(passengers, null, 4)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                                <Form.Label>Offer</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    onChange={handleOfferInputChange}
                                    value={JSON.stringify(offer, null, 4)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
                                <Form.Label>Seat Maps</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    onChange={handleSeatMapsInputChange}
                                    value={JSON.stringify(seatMaps, null, 4)} />
                            </Form.Group>
                            <h2>Outpus</h2>
                            <p className="text-muted">This is the data output byt the seat selection component.</p>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
                                <Form.Label>Selected Seats</Form.Label>
                                <Form.Control as="textarea" disabled={true} rows={6} value={JSON.stringify(seatSelection, null, 4)} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                <Modal show={showSeatMap}
                    onHide={handleClose}
                    fullscreen={true}
                >
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

            </Container>
        </div>
    )
}