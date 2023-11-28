// components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import your custom styles

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3002/login", { email, password })
            .then(result => {
                if (result.data === "Success") {
                    navigate("/add-event");
                } else {
                    toast.error(result.data, {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Internal Server Error", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            });
    };

    return (
        <div className="login-container" id="form">
            <form onSubmit={onSubmit} className="glassmorphism-form">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control glass-input"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control glass-input"
                        id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>

                <button type="submit" className="btn btn-primary glass-button">
                    Submit
                    <div className="click-effect"></div>
                </button>
            </form>
        </div>
    );
}
