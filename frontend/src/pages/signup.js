import React, {useEffect, useState} from 'react'
import app from "../App";
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from './header';


function Signup() {

    useEffect(() => {


        if (!JSON.parse(localStorage.getItem('user-info'))) {
            const user = JSON.parse(localStorage.getItem('user-info'));

        } else {
            navigate('/logout');
        }


    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); //navigation
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false)


    const signupData = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

          let item = {name, password, email};

          let result = await fetch("http://localhost:8000/api/signup", {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              },
              body: JSON.stringify(item)
          })
              .catch(error => console.error(error));
          result = await result.json();
          if(result.errors){
              console.log(result.errors);
              alert(result.errors.email[0]);
          }
          if (result.message) {
              alert(result.message);
              navigate('/login');
          } else {
              alert('Registration Failed');
          }

    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const validateForm = () => {
        let errors = {};
        if (!name || name.trim().length === 0) {
            errors.name = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
            errors.name = "Name should contain only letters and spaces";
        } else if (name.trim().length > 255) {
            errors.name = "Name should not exceed 255 characters";
        }

        if (!email || email.trim().length === 0) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
            errors.email = "Invalid email address";
            console.log("hi");
        }

        if (!password || password.trim().length === 0) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        return errors;
    };


    return (

        <div>
            <Header/>
        <div className="container mt-5">
            <Form onSubmit={signupData} className="w-50 text-left mx-auto">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" value={name}
                                  onChange={(e) => setName(e.target.value)}  isInvalid={errors.name} required/>
                    {errors.name && (
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="text" placeholder="Enter email" value={email}
                                  onChange={(e) => setEmail(e.target.value)}  isInvalid={errors.email} required/>
                    {errors.email && (
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" value={password}
                                  onChange={(e) => setPassword(e.target.value)} isInvalid={errors.password} required/>
                    {errors.password && (
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    )}

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