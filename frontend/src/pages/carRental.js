import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";


function RentCar() {
    useEffect(() => {

        if (JSON.parse(localStorage.getItem('user-info'))) {
            const user = JSON.parse(localStorage.getItem('user-info'));
            if (user.isAdmin == true) {
                navigate('/logout');
            }
        }else {
            navigate('/login');
        }

        }, []);

    // const user = JSON.parse(localStorage.getItem('user_info'));
    const carPrice = JSON.parse(localStorage.getItem('price'));

    const [rental_date, setRentalDate] = useState('');
    const [return_date, setReturnDate] = useState('');
    const {id} = useParams();
    const navigate = useNavigate(); //navigation
    const rentDateObj = new Date(rental_date);
    const returnDateObj = new Date(return_date);
    const timeDiff = returnDateObj.getTime() - rentDateObj.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24); // number of milliseconds in a day
    const totalPrice = daysDiff * carPrice;


    const handleSubmit = async (event) => {
        if (totalPrice > 200000) {
            alert("Hey,you cannot rent the car for so long");
            return;
        }

        if (isNaN(totalPrice) || totalPrice < 0) {
            alert("Invalid price calculation. Please check the rent dates.");
            return;
        }
        event.preventDefault();

        const carId = id;
        const userId = JSON.parse(localStorage.getItem('user-info')).id;
        const carPrice = JSON.parse(localStorage.getItem('price'));
        const formData = new FormData();

        formData.append('car_id', carId);
        formData.append('user_id', userId);
        formData.append('price', carPrice);
        formData.append("rental_date", rental_date);
        formData.append("return_date", return_date);

        let result = await fetch("http://localhost:8000/api/rentals/create", {
            method: 'POST',
            body: formData
        })
            .catch((error) => {
                alert("error")
            })

        result = await result.json();
        console.warn("result", result);
        if (result.carId) {
            alert("Car Rented Successfully");
            window.location="/carlist";
            localStorage.setItem("rent-info", JSON.stringify(result));

        } else {
            alert("Network error");
        }
    }
        const today = new Date().toISOString().split('T')[0];
    // const carPrice = JSON.parse(localStorage.getItem('price'));



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
                            <Nav.Link href="/carinfo">Your Rented Cars</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div className={"container mt-5"}>
                <Form onSubmit={handleSubmit} className={"w-50 text-left mx-auto mt-5"}>
                    <Form.Group className="mb-3" controlId="formBasicBrand">
                        <Form.Label>Rental date</Form.Label>
                        <Form.Control required min={today} type="date" placeholder="Enter Rental Date" value={rental_date}
                                      onChange={(e) => setRentalDate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicModel">
                        <Form.Label>Return date</Form.Label>
                        <Form.Control required min={rental_date || today}  type="date" placeholder="Enter Return Date" value={return_date}
                                      onChange={(e) => setReturnDate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicModel">
                        <Form.Label>Total Price</Form.Label>
                        <Form.Control disabled type="integer" placeholder="Enter Model" value={totalPrice}/>
                    </Form.Group>


                    <Button type={"submit"} variant="primary">
                        Confirm Rent
                    </Button>
                </Form>

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

export default RentCar;
