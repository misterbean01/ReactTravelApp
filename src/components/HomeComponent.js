import React, { Component } from "react";

export class Home extends Component {
    render() {
        return (
            <div className='mt-5'>
                <h3 className='d-flex justify-content-center'>
                    Welcome to Travel App!
                </h3>
                <br />
                <div className="m-1 d-flex justify-content-center">
                    You can check our travel locations on the Location Menu.
                    Don't forget to write a review!
                </ div>
            </div>
        )
    }
}