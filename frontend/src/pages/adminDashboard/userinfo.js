import React, {useState, useEffect} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'assets/css/ui.css';
// import 'assets/css/responsive.css';
// import 'assets/css/all.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function UserInfo() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate(); //navigation


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
        fetch('http://localhost:8000/api/userinfo')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error(error));

    }, []);



    return (
        <div>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/dashboard">Car Me Now</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div className="App">
                <section className="section-content padding-y">
                    <div className="container">
                        <div className="row">
                            <main className="col">
                                <div className="row row-cols-1 row-cols-md-3 g-4">
                                    {cars.map(car => (
                                        <div className="col">
                                            <figure className="card card-product-grid">
                                                <div className="img-wrap">
                                                    <span className="badge badge-danger"> exclusive </span>
                                                    <img src={`http://localhost:8000/storage/photos/${car.photo}`} alt={car.brand_name}/>
                                                    <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a>
                                                </div>
                                                <figcaption className="info-wrap">
                                                    <div>
                                                        <div className="price-wrap">
                                                            <span className="price">Rented By:  </span>
                                                            <span className="">{car.user_name}</span>
                                                        </div>
                                                        <div className="price-wrap">
                                                            <span className="price">Rent Duration:  </span>
                                                            <span className="">{car.rent_duration}</span>
                                                        </div>
                                                        <div>
                                                            <span className="price-wrap"> Return Date:{car.return_date}</span>
                                                        </div>
                                                        <div>
                                                            <span className="price-wrap"> Rental Date:{car.rental_date}</span>
                                                        </div>
                                                        <span className="price-wrap"> Brand:{car.brand_name}</span>
                                                        <div>
                                                            <span className="price-wrap"> Model:{car.model}</span>
                                                        </div>
                                                        <div className="d-md-none">
                                                            <span className="price-wrap"> Fuel Type:{car.fuel_type}</span>
                                                        </div>
                                                        <div className="price-wrap mt-2">
                                                            <span className="price">Rs {car.price_per_day}</span>
                                                            <del className="price-old">{car.price_per_day + 2000}</del>
                                                        </div>
                                                    </div>
                                                </figcaption>
                                            </figure>
                                        </div>
                                    ))}
                                </div>
                            </main>
                        </div>
                    </div>
                </section>
                <footer className="section-footer border-top padding-y">
                    <div className="container">
                        <p className="float-md-right">&copy; Copyright 2021 All rights
                            reserved</p>

                    </div>
                </footer>
            </div>
        </div>
    )

}


export default UserInfo;