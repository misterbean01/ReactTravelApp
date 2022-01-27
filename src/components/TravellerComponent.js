import React, { Component } from "react";
import { Table } from 'react-bootstrap';

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
        fetch(process.env.REACT_APP_API + 'traveller')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ travellers: data })
            });
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