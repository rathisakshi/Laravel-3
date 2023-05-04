import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";


function RentCar() {
    const [rental_date, setRentalDate] = useState('');
    const [return_date, setReturnDate] = useState('');
    const {id} = useParams();
    const navigate = useNavigate(); //navigation
    useEffect(() => {

        if (JSON.parse(localStorage.getItem('user-info'))) {
            const user = JSON.parse(localStorage.getItem('user-info'));
        } else {
            navigate('/login');
        }

    }, []);

    const handleSubmit = async (event) => {
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
        });
        result = await result.json();
        console.warn("result", result);
        localStorage.setItem("rent-info", JSON.stringify(result));
        window.location.href = "/carlist";
    }

    const carPrice = JSON.parse(localStorage.getItem('price'));
    const rentDateObj = new Date(rental_date);
    const returnDateObj = new Date(return_date);
    const timeDiff = returnDateObj.getTime() - rentDateObj.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24); // number of milliseconds in a day
    const totalPrice = daysDiff * carPrice;



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
            <div className={"container mt-5"}>
                <Form onSubmit={handleSubmit} className={"w-50 text-left mx-auto mt-5"}>
                    <Form.Group className="mb-3" controlId="formBasicBrand">
                        <Form.Label>Rental date</Form.Label>
                        <Form.Control type="date" placeholder="Enter Rental Date" value={rental_date}
                                      onChange={(e) => setRentalDate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicModel">
                        <Form.Label>Return date</Form.Label>
                        <Form.Control type="date" placeholder="Enter Return Date" value={return_date}
                                      onChange={(e) => setReturnDate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicModel">
                        <Form.Label>Total Price</Form.Label>
                        <Form.Control disabled type="text" placeholder="Enter Model" value={totalPrice}/>
                    </Form.Group>


                    <Button type={"submit"} variant="primary">
                        Confirm Rent
                    </Button>
                </Form>

            </div>
        </div>


    );
}

export default RentCar;
