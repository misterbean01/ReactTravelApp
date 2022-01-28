import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Modal from 'react-modal'
import axios from 'axios';
import {
    Form, FormGroup, Label, Input
} from 'reactstrap';

Modal.setAppElement('#root')
export const Review = () => {

    const [reviews, setReivews] = useState([]);
    const [travellers, setTravellers] = useState([]);
    const [openModal, setOpenModal] = useState(false)

    const [reviewArea, setReviewArea] = useState("")
    const [ratingSelect, setRatingSelect] = useState("")
    const [travellerSelect, setTravellerSelect] = useState("")


    const location = useLocation();
    const { loc } = location.state;

    const api = axios.create({
        baseURL: 'http://ec2-54-243-159-146.compute-1.amazonaws.com/'
        //baseURL: 'http://127.0.0.1:8000/'
    })

    const refrestList = async () => {
        //console.log(loc);
        api.get('/traveller')
            .then(response => {
                //console.log(response.data)
                setTravellers(response.data);
            })

        api.get('/location/' + loc.LocationId + '/review')
            .then(response => {
                //console.log(response.data)
                setReivews(response.data);
            })
    }

    // const combineName = (traveller) => {
    //     //console.log(traveller)
    //     let fname = traveller.TravellerFirstName;
    //     let lname = traveller.TravellerLastName;
    //     return fname + ' ' + lname;
    // }

    function submitReview(event) {
        var todaysDate = new Date();
        var date = todaysDate.getFullYear() + '-' + (todaysDate.getMonth() + 1) + '-' + todaysDate.getDate();
        //console.log(date);
        const newReview = {
            // "ReviewContent": reviewArea,
            // "ReviewDate": 'sss',
            // "ReviewRating": parseInt(ratingSelect),
            // "Traveller": parseInt(travellerSelect),
            "ReviewContent": reviewArea,
            "ReviewDate": date,
            "ReviewRating": parseInt(ratingSelect),
            "Traveller": parseInt(travellerSelect),
            "Location": loc.LocationId

        }
        console.log(newReview)
        api.post('/location/' + loc.LocationId + '/review', newReview
        ).then(response => {
            console.log(response);
            refrestList();
        }).catch(error => {
            console.log(error);
        })
        setOpenModal(false);
        event.preventDefault();
    }

    function handleOnChangeSelectTravller(event) {
        setTravellerSelect(event.target.value)
    }

    function handleOnChangeSelectRating(event) {
        setRatingSelect(event.target.value)
    }

    function handleOnChangeText(event) {
        setReviewArea(event.target.value)
    }

    useEffect(() => {
        refrestList()
    }, []);

    // travellers.find(trav => trav.TravellerID === review.Traveller).TravellerFirstName
    return (
        <div className='mt-3'>
            <h3 className="d-flex justify-content-center">{loc.LocationName} Reviews</h3>
            <h6 className="d-flex justify-content-center">{loc.LocationsDescription}</h6>
            <Table className="mt-3" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Traveller ID</th>
                        <th>Rating</th>
                        <th>Date</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review =>
                        <tr key={review.ReviewId}>
                            <td>{review.Traveller} </td>
                            <td>{review.ReviewRating}</td>
                            <td>{review.ReviewDate}</td>
                            <td>{review.ReviewContent}</td>
                        </tr>)}
                </tbody>
            </Table>
            <button onClick={() => { setOpenModal(true) }}>Add Review</button>

            <Modal isOpen={openModal} onRequestClose={() => setOpenModal(false)} shouldCloseOnOverlayClick={false}
                style={{ overlay: { backgroundColor: 'grey' } }}>
                <h4 className="d-flex justify-content-center">Add your Review</h4>
                <div className="d-flex justify-content-center">
                    <div className="mt-5 justify-content-center">

                        <Form onSubmit={submitReview}>
                            <FormGroup row>
                                <Label for="travellerSelect">Traveller Account:</Label>
                                <Input type="select" name="travellerSelect" id="travellerSelect" onChange={handleOnChangeSelectTravller}  >
                                    <option key={0} value={null} defaultValue>Select Traveller</option>
                                    {travellers.map((trav) => (
                                        <option key={trav.TravellerId} value={trav.TravellerId}>{trav.TravellerFirstName + ' ' + trav.TravellerLastName} </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="ratingSelect">Rate it 1 - 5 (Worst - Best):</Label>
                                <Input type="select" name="ratingSelect" id="ratingSelect" onChange={handleOnChangeSelectRating}  >
                                    <option key={0} value={null} defaultValue>Select Rating</option>
                                    <option key={1} value={1}>1</option>
                                    <option key={2} value={2}>2</option>
                                    <option key={3} value={3}>3</option>
                                    <option key={4} value={4}>4</option>
                                    <option key={5} value={5}>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="reviewArea">Review for {loc.LocationName}:</Label>
                                <Input type="textarea" name="reviewArea" id="reviewArea" onChange={handleOnChangeText} value={reviewArea} />
                            </FormGroup>
                            <button onClick={() => setOpenModal(false)}>Cancel</button>
                            <button type="submit">Submit</button>
                        </Form>

                    </div>
                </div>

            </Modal>
        </div>
    )
}

