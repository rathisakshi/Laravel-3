import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


function AddCar() {
    const navigate = useNavigate();
    useEffect(() => {


        if(JSON.parse(localStorage.getItem('user_info'))){
            const user = JSON.parse(localStorage.getItem('user_info'));
            if(user.isAdmin==false){
                navigate('/logout');
            }
        }
        else{
            navigate('/add');
        }

    }, []);
    const [photo, setPhoto] = useState(null);
    const [brand_name, setBrandName] = useState('');
    const [model, setModel] = useState('');
    const [price_per_day, setPricePerDay] = useState('');
    const [fuel_type, setFuelType] = useState('');
    const [gearbox, setGearbox] = useState('');
    const [availability, setAvailability] = useState(1);


    const handleSubmit = async (event) => {
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

            let result = await fetch("http://localhost:8000/api/cars/create", {
                method: 'POST',
                body:formData
            });
            result = await result.json();
            console.warn("result",result);
            localStorage.setItem("car-info", JSON.stringify(result));

        // redirect to dashboard page
        window.location.href = "/dashboard";
        }



    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Car Me Now</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/login">Home</Nav.Link>
                        <Nav.Link href="/login">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        <div className={"container"}>
            <Form onSubmit={handleSubmit} className={"w-50 text-left"}>
                <Form.Group className="mb-3" controlId="formBasicBrand">
                    <Form.Label>Brand Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Brand Name" value={brand_name}
                                  onChange={(e) => setBrandName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicModel">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Enter Model" value={model}
                                  onChange={(e) => setModel(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price Per day</Form.Label>
                    <Form.Control type="integer" placeholder="Enter Price" value={price_per_day}
                                  onChange={(e) => setPricePerDay(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFuel">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Control type="text" placeholder="Enter Fuel Type" value={fuel_type}
                                  onChange={(e) => setFuelType(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicGearbox">
                    <Form.Label>Gearbox</Form.Label>
                    <Form.Control type="text" placeholder="Enter GearBox type" value={gearbox}
                                  onChange={(e) => setGearbox(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicModel">
                    <Form.Label>Availability</Form.Label>
                    <Form.Check
                        type="checkbox"
                        checked={availability}
                        onChange={(e) => setAvailability(Number(e.target.checked))}
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
    );
}

export default AddCar;
