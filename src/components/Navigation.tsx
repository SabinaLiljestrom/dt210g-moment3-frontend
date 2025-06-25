import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation: React.FC = () => {
  return (
    <Navbar bg="light" expand="sm" className="shadow-sm rounded">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Eskils&nbsp;Blogg
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-2">
            <Nav.Link as={NavLink} to="/admin">
              Admin
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              Logga in
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
