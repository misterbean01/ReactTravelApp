import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
        }
        // this.showModal = this.showModal.bind(this);
        // this.hideModal = this.hideModal.bind(this);
    }

    refrestList() {
        fetch(process.env.REACT_APP_API + 'location')
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({ locations: data })
            });
    }

    componentDidMount() {
        this.refrestList()
    }

    componentDidUpdate() {
        this.refrestList()
    }

    // showModal = () => {
    //     this.setState({ show: true });
    // };

    // hideModal = () => {
    //     this.setState({ show: false });
    // };

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    getLocationById(id) {
        return this.locations.filter(loc => loc.LocationId === id);
    }

    render() {
        const { locations } = this.state;
        return (
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Location Name</th>
                        <th>Description</th>
                        <th>GPS</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map(location =>
                        <tr key={location.LocationId}>
                            <td>{location.LocationName}</td>
                            <td>{location.LocationsDescription}</td>
                            <td>{location.LocationsGPS}</td>
                            <td>
                                <Link to={'../location/' + location.LocationId + '/review'} state={{ loc: location }}>
                                    My route
                                </Link>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        )
    }
}