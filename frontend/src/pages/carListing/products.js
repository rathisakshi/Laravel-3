import React, {useState, useEffect} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './products.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'assets/css/ui.css';
// import 'assets/css/responsive.css';
// import 'assets/css/all.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function ProductList() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate(); //navigation


    useEffect(() => {


        if (JSON.parse(localStorage.getItem('user-info'))) {
            const user = JSON.parse(localStorage.getItem('user-info'));

        } else {
            navigate('/logout');
        }

        fetch('http://localhost:8000/api/cars')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error(error));
    }, []);
    const handleSubmit = (id, price) => {
        localStorage.setItem("price", JSON.stringify(price));
        window.location.href = `/rental/${id}`;
    };


    return (
        <div>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Car Me Now</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/carlist">Rent a Car</Nav.Link>
                            <Nav.Link href="/carinfo">Your Rented Cars</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>

            <div className="App">
                <section class="section-content padding-y">
                    <div class="container">

                        <div class="row">

                            <main>
                                <div class="row">
                                    {cars.map(car => (
                                        <div class="col-md-4">
                                            <figure class="card card-product-grid">
                                                <div class="img-wrap">
                                                    <span class="badge badge-danger"> exclusive </span>
                                                    <img src={`http://localhost:8000/storage/photos/${car.photo}`}/>
                                                    <a class="btn-overlay" href="#"><i
                                                        class="fa fa-search-plus"></i> Quick
                                                        view</a>
                                                </div>

                                                <figcaption class="info-wrap">
                                                    <div>
                                                        <span class="title"> Brand:{car.brand_name}</span>
                                                        <div>
                                                            <span className="title"> Model:{car.model}</span>
                                                        </div>
                                                        <div>
                                                            <span className="title"> Fuel Type:{car.fuel_type}</span>
                                                        </div>
                                                        <div class="price-wrap mt-2">
                                                            <span class="price">Rs {car.price_per_day}</span>
                                                        </div>

                                                    </div>
                                                    <a href="#" onClick={() => handleSubmit(car.id, car.price_per_day)}
                                                       class="btn btn-block btn-success">Rent Now</a>
                                                </figcaption>

                                            </figure>

                                        </div>
                                    ))}
                                </div>




                            </main>

                        </div>

                    </div>
                </section>

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
        </div>
    );
}


export default ProductList;