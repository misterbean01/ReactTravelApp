import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ec2-54-243-159-146.compute-1.amazonaws.com/'
})
export class Traveller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            travellers: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    refrestList() {
        api.get('/traveller')
            .then(response => {
                //console.log(response.data)
                this.setState({ travellers: response.data })
            })
    }

    componentDidMount() {
        this.refrestList()
    }

    componentDidUpdate() {
        this.refrestList()
    }

    render() {
        const { travellers } = this.state;
        return (
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Short Bio</th>
                    </tr>
                </thead>
                <tbody>
                    {travellers.map(traveller =>
                        <tr key={traveller.TravellerId}>
                            <td>{traveller.TravellerFirstName}</td>
                            <td>{traveller.TravellerLastName}</td>
                            <td>{traveller.TravellerBio}</td>
                        </tr>)}
                </tbody>

            </Table>
        )
    }
}