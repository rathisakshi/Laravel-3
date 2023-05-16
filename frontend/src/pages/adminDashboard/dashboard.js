import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './dashboard.css';
import {useNavigate} from "react-router-dom";
import EditCar from "./editCar";
import {Container, Nav, Navbar} from "react-bootstrap";


function CarList() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {


            if(JSON.parse(localStorage.getItem('user-info'))){
                const user = JSON.parse(localStorage.getItem('user-info'));
                if(user.isAdmin==false){
                    navigate('/logout');
                }
            }
            else{
                navigate('/login');
            }


        fetch('http://localhost:8000/api/cars')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error(error));
    }, []);
    const carDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this car?');
        if (confirmed) {
            let result = await fetch(`http://localhost:8000/api/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': 'application/json'
                }
            })
            result = await result.json();
            setCars(cars.filter((car) => car.id !== id));
            console.warn("result", result.success);

            navigate("/dashboard");
        }
    }
    const handleAddCarsClick = () => {
        window.location.href = '/add';
    };
    const handleEdit = (id) => {
        // Redirect to the ContactForm page with the contact id as a query parameter and isEdit set to true
        window.location.href = `/edit/${id}`;
    };

    return (
        <div className="w-100">
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/dashboard">Car Me Now</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/userinfo">User info</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>

                        </Nav>
                    </Container>
                </Navbar>
            </div>

            <div className="row mt-3 data">
                <div className="">
                    <h1 className="text-center">List of Cars</h1>
                </div>
                <div className="tbl1 col-12 mx-auto w-75">
                    <Table >
                        <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Brand Name</th>
                            <th>Car Image</th>
                            <th>Model</th>
                            <th>Price per day</th>
                            <th>Fuel type</th>
                            <th>Gearbox</th>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cars.map(car => (
                            <tr key={car.id} className="tbl-row">
                                <td>{car.id}</td>
                                <td>{car.brand_name}</td>
                                <td className="img-thread"><img className="imageprop" width="80px" src={`http://localhost:8000/storage/photos/${car.photo}`} alt="Car Photo" /></td>
                                <td>{car.model}</td>
                                <td>{car.price_per_day}</td>
                                <td>{car.fuel_type}</td>
                                <td>{car.gearbox}</td>
                                <td>{car.availability ? 'Available' : 'Not Available'}</td>
                                <td>
                                    <td><Button className="m-lg-1" variant="secondary" onClick={()=> carDelete(car.id)} >Delete</Button>
                                        <Button className="m-lg-1 editbtn" variant="secondary" onClick={() => handleEdit(car.id)}>Edit</Button>
                                    </td>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-success" onClick={handleAddCarsClick}>Add Cars</button>
                </div>
            </div>
        </div>

    );
}

export default CarList;
