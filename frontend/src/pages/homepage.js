import React, {useEffect} from 'react';
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import './adminDashboard/dashboard.css';
import {useNavigate} from "react-router-dom";

function Homepage() {
    const navigate = useNavigate(); //navigation

    useEffect(() => {

        if(JSON.parse(localStorage.getItem('user-info'))){
            const user = JSON.parse(localStorage.getItem('user-info'));

        }
        else{
            navigate('/login');
        }

    }, []);
    return (
        <div>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/home">Car Me Now</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/carlist">Rent a Car</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="Images/ab2.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="Images/ch1.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="Images/carr3.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>

        </div>

            <div className="row my-5 justify-content-center" >
                <h2 className="text-center my-5">Our Benefits</h2>
                <div className="col-md-3">
                    <div className="card card-hover h-100 bg-dark">
                        <div className="card-body w-33">
                            <h3 className="card-title text-white text-center">Convenience</h3>
                            <p className="card-text text-white">Our rental locations are conveniently located in major cities and airports around the world, making it easy for you to get on the road.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card card-hover h-100 bg-dark">
                        <div className="card-body w-33">
                            <h3 className="card-title text-white text-center">Flexibility</h3>
                            <p className="card-text text-white">We offer a wide range of vehicles to meet your needs, whether you need a compact car for a quick trip or a full-size SUV for a family vacation.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card card-hover h-100 bg-dark">
                        <div className="card-body w-33">
                            <h3 className="card-title text-white text-center">Value</h3>
                            <p className="card-text text-white">Our competitive rates and special offers make it easy for you to get a great deal on your rental car, so you can save money and enjoy your trip.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <h2>Ready to rent a car?</h2>
                <p className="lead">Choose from our wide selection of vehicles and book your rental today.</p>
                <a className="btn btn-primary btn-lg" href="/rental">Rent a Car</a>
            </div>
            <footer className="bg-dark text-white py-4 mt-5">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <h5 className="text-center">About Us</h5>
                            <p>We are a leading car rental company with locations around the world. We offer a wide range of vehicles to meet your needs, from compact cars to SUVs.</p>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-center">Contact Us</h5>
                            <ul className="list-unstyled text-center">
                                <li><i className="bi bi-geo-alt-fill me-3 "></i>123 Main Street, City</li>
                                <li><i className="bi bi-telephone-fill me-3"></i>(123) 456-7890</li>
                                <li><i className="bi bi-envelope-fill me-3 "></i>info@carrental.com</li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Follow Us</h5>
                            <ul className="list-unstyled">
                                <li><i className="bi bi-facebook me-3"></i>Facebook</li>
                                <li><i className="bi bi-twitter me-3"></i>Twitter</li>
                                <li><i className="bi bi-instagram me-3"></i>Instagram</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 text-center">
                            <p>&copy; 2023 CarMeNow. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>


        </div>


    );
}

export default Homepage;
