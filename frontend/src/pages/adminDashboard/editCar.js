import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import AddCar from "./addCar";
import Swal from 'sweetalert2';
import {useParams} from "react-router-dom";
import axios from 'axios';
import {Container, Nav, Navbar} from "react-bootstrap";


function EditCar() {

    useEffect(() => {

        if (JSON.parse(localStorage.getItem('user-info'))) {
            const user = JSON.parse(localStorage.getItem('user-info'));
            if (user.isAdmin == false) {
                navigate('/logout');
            }
        } else {
            navigate('/edit');
        }

    }, []);
    const {id} = useParams()
    useEffect(() => {
        fetchCars()
    }, [])


    const [photo, setPhoto] = useState(null);
    const [brand_name, setBrandName] = useState('');
    const [model, setModel] = useState('');
    const [price_per_day, setPricePerDay] = useState('');
    const [fuel_type, setFuelType] = useState('');
    const [gearbox, setGearbox] = useState('');
    const [availability, setAvailability] = useState(false);
    const [errImage, setErrImage] = useState("");
    const [errPrice, setErrPrice] = useState("");
    const [errFuel, setErrFuel] = useState("");
    const [errGearbox, setErrGearbox] = useState("");

    const navigate = useNavigate(); //navigation

    const fetchCars = async () => {
        await axios.get(`http://localhost:8000/api/cars/edit/${id}`).then(({data}) => {
            const {brand_name, price_per_day, fuel_type, model, gearbox, availability, photo} = data
            setBrandName(data.brand_name)
            setPricePerDay(data.price_per_day)
            setFuelType(data.fuel_type)
            setModel(data.model)
            setGearbox(data.gearbox)
            setAvailability(data.availability)
            setPhoto(data.photo)
        }).catch(({response: {data}}) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }
    const carUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("brand_name", brand_name);
        formData.append("model", model);
        formData.append("price_per_day", price_per_day);
        formData.append("fuel_type", fuel_type);
        formData.append("gearbox", gearbox);
        formData.append('availability', availability);
        console.log("data", availability);

        let result = await fetch(`http://localhost:8000/api/cars/${id}`, {
            method: 'POST',
            body: formData
        }).catch(error => {
            alert(error)
        })
        result = await result.json();
        console.warn("result", result);
        // navigate('/dashboard')
        // localStorage.setItem("car-info", JSON.stringify(result));
        if (result.message) {
            alert("Car Updated Successfully")
            navigate('/dashboard');
        }
        if (result.error) {
            alert("Invalid Data")
        }
        if (result.errors) {
            if (result.errors.price_per_day) {
                setErrPrice(result.errors.price_per_day[0])
            }

            if (result.errors.fuel_type) {
                setErrFuel(result.errors.fuel_type[0])
            }
            if (result.errors.gearbox) {
                setErrGearbox(result.errors.gearbox[0])
            }
        }


    }

    return (
        <div>
            <div>
                <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>

                    <Container>
                        <Navbar.Brand href="/dashboard">Car Me Now</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                            <Nav className="me-auto">
                                <Nav.Link href="/dashboard">Home</Nav.Link>
                                <Nav.Link href="/userinfo">User info</Nav.Link>
                                <Nav.Link href="/logout">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>
            <div className={"container-fluid"}>
                <div className={"row justify-content-center"}>
                    <div className={"col-12 col-md-6"}>
                        <Form onSubmit={carUpdate} className={"w-50 text-left"}>
                            <Form.Group className="mb-3" controlId="formBasicBrand">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter Brand Name" value={brand_name}
                                              onChange={(e) => setBrandName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicModel">
                                <Form.Label>Model</Form.Label>
                                <Form.Control required type="text" placeholder="Enter Model" value={model}
                                              onChange={(e) => setModel(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                <Form.Label>Price Per day</Form.Label>
                                <Form.Control required type="integer" placeholder="Enter Price" value={price_per_day}
                                              onChange={(e) => setPricePerDay(e.target.value)}/>
                                <span className="text-danger">{errPrice}</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicFuel">
                                <Form.Label>Fuel Type</Form.Label>
                                <Form.Select required value={fuel_type} onChange={(e) => setFuelType(e.target.value)}
                                             aria-label="Default select example">
                                    <option>SELECT FUEL TYPE</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                </Form.Select>
                                <span className="text-danger">{errFuel}</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicGearbox">
                                <Form.Label>Gearbox</Form.Label>
                                <Form.Select required placeholder="Enter GearBox type" value={gearbox}
                                             onChange={(e) => setGearbox(e.target.value)}>
                                    <option>SELECT GEARBOX</option>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                </Form.Select>
                                <span className="text-danger">{errGearbox}</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicModel">
                                <Form.Label>Availability</Form.Label>
                                <br/>
                                <Form.Check
                                    type="checkbox"
                                    checked={availability === 1}
                                    onChange={(e) => setAvailability(Number(e.target.checked))}
                                    label="Available"
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicGearbox">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file"
                                              onChange={(e) => setPhoto(e.target.files[0])}/>
                            </Form.Group>

                            <Button type={"submit"} variant="primary">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default EditCar;
