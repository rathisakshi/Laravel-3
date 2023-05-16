import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginForm from "./pages/login";
import SignupForm from "./pages/signup";
import Dashboard from "./pages/adminDashboard/dashboard";
import AddCar from "./pages/adminDashboard/addCar";
import EditCar from "./pages/adminDashboard/editCar";
import HomePage from "./pages/homepage";
import CarList from "./pages/carListing/products";
import CarRental from "./pages/carRental";
import Logout from "./pages/include/logout";
import Carinfo from "./pages/carListing/carinfo";
import Userinfo from "./pages/adminDashboard/userinfo";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<LoginForm/>}/>
                <Route path={'/signup'} element={<SignupForm/>}/>
                <Route path={'/'} element={<SignupForm/>}/>
                <Route path={'/dashboard'} element={<Dashboard/>}/>
                <Route path={'/add'} element={<AddCar/>}/>
                <Route path={'/edit/:id'} element={<EditCar/>}/>
                <Route path={'/home'} element={<HomePage/>}/>
                <Route path={'/carlist'} element={<CarList/>}/>
                <Route path={'/rental/:id'} element={<CarRental/>}/>
                <Route path={'/logout'} element={<Logout/>}/>
                <Route path={'/userinfo'} element={<Userinfo/>}/>
                <Route path={'/carinfo'} element={<Carinfo/>}/>

            </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
