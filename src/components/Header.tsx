import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { logout, userAuth } = useAuth();
    return (
        <Navbar sticky='top' bg="primary" variant="dark" expand="md" className="m-0">
            <Container fluid>
                <Navbar.Brand >Pharma Lab</Navbar.Brand>
                {userAuth && <span>{userAuth.uid}</span>}
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand`}
                    aria-labelledby={`offcanvasNavbarLabel-expand`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                            Pharma Lab
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <Nav.Link href="#action3">Sign Out</Nav.Link>
                            <Button onClick={async () => {
                                await logout();
                            }}>
                                logout
                            </Button>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;