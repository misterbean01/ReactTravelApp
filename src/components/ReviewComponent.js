import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import { useLocation } from "react-router-dom";


export const Review = () => {

    const [reviews, setReivews] = useState([]);
    const location = useLocation()
    const { loc } = location.state

    const refrestList = () => {
        //console.log(loc);
        fetch(process.env.REACT_APP_API + 'location/' + loc.LocationId + '/review')
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                setReivews(data)
            });
    }


    useEffect(() => {
        refrestList()
    }, []);



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