import React, { Component } from 'react';
import loading from '../assets/loading.gif';

export class Spinner extends Component {
    render() {
        return (
            <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner-content">
                    <img src={loading} alt="loading" />
                </div>
            </div>
        );
    }
}

export default Spinner;
