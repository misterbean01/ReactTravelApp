import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import axios from 'axios';


export const Review = () => {

    const [reviews, setReivews] = useState([]);
    const location = useLocation();
    const { loc } = location.state;

    const api = axios.create({
        baseURL: 'http://ec2-54-243-159-146.compute-1.amazonaws.com/'
    })

    const refrestList = () => {
        //console.log(loc);
        api.get('/location/' + loc.LocationId + '/review')
            .then(response => {
                //console.log(response.data)
                setReivews(response.data);
            })
    }

    useEffect(() => {
        refrestList()
    });

    return (
        <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Rating</th>
                    <th>Date</th>
                    <th>Traveller ID</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>
                {reviews.map(review =>
                    <tr key={review.ReviewId}>
                        <td>{review.ReviewRating}</td>
                        <td>{review.ReviewDate}</td>
                        <td>{review.Traveller}</td>
                        <td>{review.ReviewContent}</td>
                    </tr>)}
            </tbody>
        </Table>
    )
}