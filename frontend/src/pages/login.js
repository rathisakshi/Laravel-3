import React, {useState,useEffect} from 'react'
import app from "../App";
import {Link, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from './header';


function Login() {
    useEffect(() => {


        if (!JSON.parse(localStorage.getItem('user-info'))) {
            const user = JSON.parse(localStorage.getItem('user-info'));

        } else {
            navigate('/logout');
        }


    }, []);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); //navigation


    const loginData = async (event) => {
        event.preventDefault();
        {
            let item = {password, email};

            let result = await fetch("http://localhost:8000/api/login", {
                method: 'POST', headers: {
                    "Content-Type": "application/json", "Accept": "application/json"
                }, body: JSON.stringify(item)
            })
                .catch(error => console.error(error));
            // console.log(result);
            result = await result.json();
            console.warn("result", result);
            // Check if user is admin
            if(result.name) {
                localStorage.setItem("user-info", JSON.stringify(result));

                if (result.isAdmin) {
                    navigate('/dashboard'); // Redirect to dashboard page
                } else {
                    navigate('/home'); // Redirect to car listings page
                }
            }
            if(result.error){
                alert("Invalid Credentials")
            }

        }
    }
    return (
        <div><Header/>
            <div className={"container"}>

                <Form onSubmit={loginData} className="w-50 text-left mx-auto mt-5" method="POST">

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" value={email}
                                      onChange={(e) => setEmail(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" value={password}
                                      onChange={(e) => setPassword(e.target.value)} required/>
                    </Form.Group>

                    <Button type={"submit"} variant="primary">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login;
