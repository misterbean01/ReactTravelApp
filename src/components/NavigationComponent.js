import React, { Component } from "react";
import { NavLink } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";

export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" href="/">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" href="/location">
                            Locations
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" href="/traveller">
                            Travellers
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}