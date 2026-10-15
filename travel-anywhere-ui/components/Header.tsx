"use client";
import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useCookies} from "react-cookie";

export default function HeaderNavigation() {
    const [cookies, setCookie] = useCookies(["atkCookie"]);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    function clearCookies() {
        setCookie("atkCookie", null, {path: "/"});
    }


    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/"><img
                    alt="Sabre logo"
                    src="/logo.png"
                    width="4167"
                    height="1201"
                    style={{width: 150, height: "auto"}}
                    className="d-inline-block align-top"
                /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" >Map</Nav.Link>
                        <Nav.Link href="/bookings" >Bookings</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {mounted && cookies.atkCookie ? (
                            <Nav.Link href="/login" onClick={clearCookies}>Sign out</Nav.Link>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}