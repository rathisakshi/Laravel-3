
import {Navbar, Nav, Container} from 'react-bootstrap';


function header()
 {
     return(
         <div>
             <Navbar bg="dark" variant="dark">
                 <Container>
                     <Navbar.Brand href="#home">Car Me Now</Navbar.Brand>
                     <Nav className="me-auto">
                         <Nav.Link href="/login">Login</Nav.Link>
                         <Nav.Link href="/signup">Signup</Nav.Link>
                     </Nav>
                 </Container>
             </Navbar>
         </div>
     )
 }
 export default header;