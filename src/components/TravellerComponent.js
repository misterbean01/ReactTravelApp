import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import Modal from 'react-modal'
import {
    Form, FormGroup, Label, Input
} from 'reactstrap';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ec2-54-243-159-146.compute-1.amazonaws.com/'
    //baseURL: 'http://127.0.0.1:8000/'
})

export const Traveller = () => {

    const [travellers, setTravellers] = useState([]);
    //const [editTraveller, setEditTraveller] = useState({ TravellerId: -1, TravellerFirstName: "", TravellerLastName: "", TravellerBio: "" });
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [firstNameText, setFirstNameText] = useState("")
    const [lastNameText, setLastNameText] = useState("")
    const [bioArea, setBioArea] = useState("")
    const [editTravellerId, setEditTravellerId] = useState("")
    const [firstNameEditText, setFirstNameEditText] = useState("")
    const [lastNameEditText, setLastNameEditText] = useState("")
    const [bioEditArea, setBioEditArea] = useState("")

    const refrestList = () => {
        //console.log(loc);
        api.get('/traveller')
            .then(response => {
                //console.log(response.data)
                setTravellers(response.data);
            })
    };

    useEffect(() => {
        refrestList()
    }, []);

    function submitTraveller(event) {
        const newTraveller = {
            "TravellerFirstName": firstNameText,
            "TravellerLastName": lastNameText,
            "TravellerBio": bioArea,
        }
        console.log(newTraveller)
        api.post('/traveller/', newTraveller
        ).then(response => {
            console.log(response);
            refrestList();
        }).catch(error => {
            console.log(error);
        })
        setOpenAddModal(false);
        event.preventDefault();
    }

    function openEditTraveller(traveller) {
        console.log(traveller)
        setEditTravellerId(traveller.TravellerId)
        setFirstNameEditText(traveller.TravellerFirstName);
        setLastNameEditText(traveller.TravellerLastName)
        setBioEditArea(traveller.TravellerBio)
        setOpenEditModal(true);
    }

    function submitEditTraveller(event) {
        const existingTraveller = {
            "TravellerId": editTravellerId,
            "TravellerFirstName": firstNameEditText,
            "TravellerLastName": lastNameEditText,
            "TravellerBio": bioEditArea,
        }

        console.log(existingTraveller)
        api.put('/traveller/' + editTravellerId, existingTraveller
        ).then(response => {
            console.log(response);
            refrestList();
        }).catch(error => {
            console.log(error);
        })
        setOpenEditModal(false);
        event.preventDefault();
    }

    function deleteTraveller(id) {
        api.delete('/traveller/' + id).then(response => {
            console.log(response);
            refrestList();
        }).catch(error => {
            console.log(error);
        })
    }

    function handleOnChangeTextFirstName(event) {
        setFirstNameText(event.target.value)
    }

    function handleOnChangeTextLastName(event) {
        setLastNameText(event.target.value)
    }

    function handleOnChangeTextBio(event) {
        setBioArea(event.target.value)
    }

    function handleOnChangeEditTextFirstName(event) {
        setFirstNameEditText(event.target.value)
    }

    function handleOnChangeEditTextLastName(event) {
        setLastNameEditText(event.target.value)
    }

    function handleOnChangeEditTextBio(event) {
        setBioEditArea(event.target.value)
    }

    return (
        <div>
            <Table className="mt-5" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Short Bio</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {travellers.map(traveller =>
                        <tr key={traveller.TravellerId}>
                            <td>{traveller.TravellerFirstName}</td>
                            <td>{traveller.TravellerLastName}</td>
                            <td>{traveller.TravellerBio}</td>
                            <td><div className="fluid">
                                <button className="p-1 m-1" onClick={() => openEditTraveller(traveller)}>Edit</button>
                                <button className="p-1 m-1" onClick={() => deleteTraveller(traveller.TravellerId)}>Delete</button></div>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
            <button onClick={() => { setOpenAddModal(true) }}>Add Traveller</button>
            <Modal isOpen={openAddModal} onRequestClose={() => setOpenAddModal(false)} shouldCloseOnOverlayClick={false}
                style={{ overlay: { backgroundColor: 'grey' } }}>
                <h4 className="d-flex justify-content-center">Add a Traveller</h4>
                <div className="d-flex justify-content-center">
                    <div className="mt-5 justify-content-center">
                        <Form onSubmit={submitTraveller}>
                            <FormGroup row>
                                <Label for="firstNameText">First Name:</Label>
                                <Input type="text" name="firstNameText" id="firstNameText" onChange={handleOnChangeTextFirstName} value={firstNameText} ></Input>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lastNameText">Last Name:</Label>
                                <Input type="text" name="lastNameText" id="lastNameText" onChange={handleOnChangeTextLastName} value={lastNameText}></Input>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="bioArea">Add Traveller Biography:</Label>
                                <Input type="textarea" name="bioArea" id="bioArea" onChange={handleOnChangeTextBio} value={bioArea} />
                            </FormGroup>
                            <button onClick={() => setOpenAddModal(false)}>Cancel</button>
                            <button type="submit">Submit</button>
                        </Form>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={openEditModal} onRequestClose={() => setOpenEditModal(false)} shouldCloseOnOverlayClick={false}
                style={{ overlay: { backgroundColor: 'grey' } }}>
                <h4 className="d-flex justify-content-center">Edit a Traveller</h4>
                <div className="d-flex justify-content-center">
                    <div className="mt-5 justify-content-center">
                        <Form onSubmit={submitEditTraveller}>
                            <FormGroup row>
                                <Label for="firstNameText">First Name:</Label>
                                <Input type="text" name="firstNameText" id="firstNameText" onChange={handleOnChangeEditTextFirstName} value={firstNameEditText} ></Input>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lastNameText">Last Name:</Label>
                                <Input type="text" name="lastNameText" id="lastNameText" onChange={handleOnChangeEditTextLastName} value={lastNameEditText} ></Input>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="bioArea">Add Traveller Biography:</Label>
                                <Input type="textarea" name="bioArea" id="bioArea" onChange={handleOnChangeEditTextBio} value={bioEditArea} />
                            </FormGroup>
                            <button onClick={() => setOpenEditModal(false)}>Cancel</button>
                            <button type="submit">Submit</button>
                        </Form>
                    </div>
                </div>
            </Modal>

        </div>
    )

}