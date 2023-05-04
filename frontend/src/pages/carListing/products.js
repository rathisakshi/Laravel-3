import React, {useState, useEffect} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'assets/css/ui.css';
// import 'assets/css/responsive.css';
// import 'assets/css/all.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function ProductList() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate(); //navigation


    useEffect(() => {

        //
        // if (JSON.parse(localStorage.getItem('user_info'))) {
        //     const user = JSON.parse(localStorage.getItem('user_info'));
        //
        // } else {
        //     navigate('/login');
        // }

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


                                <nav class="mt-4" aria-label="Page navigation sample">
                                    <ul class="pagination">
                                        <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>

                            </main>

                        </div>

                    </div>
                </section>

                <footer class="section-footer border-top padding-y">
                    <div class="container">
                        <p class="float-md-right">
                            &copy; Copyright 2021 All rights reserved
                        </p>
                        <p>
                            <a href="#">Terms and conditions</a>
                        </p>
                    </div>
                </footer>


            </div>
        </div>
    );
}


export default ProductList;