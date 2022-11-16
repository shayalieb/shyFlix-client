import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

//Signout method
export function Menuebar({ user }) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }
    //Token method
    const isAuth = () => {
        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    };
    //Unordered list returns    
    return (
        <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">shyFlix movieDex</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {/*Hide signup inf the token exist*/}
                        {isAuth() && (
                            <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Sign in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Sign up</Nav.Link>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}







