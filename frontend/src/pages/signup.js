import React, {useState} from 'react'
import app from "../App";
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from './header'

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); //navigation


    const signupData = async (event) => {
        event.preventDefault();
        {
            let item = {name, password, email};

            let result = await fetch("http://localhost:8000/api/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/login");
        }
    }

    return (

        <div>
            <Header/>
        <div className="container mt-5">
            <Form onSubmit={signupData} className="w-50 text-left mx-auto">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" value={name}
                                  onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" value={email}
                                  onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Button type={"submit"} variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
        </div>

    )
}

export default Signup;