import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Navigation 
 Inloggad: Posts, Admin, Logga ut
 Utloggad: Posts, Logga in
 */
const Navigation: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Navbar bg="light" expand="sm" className="shadow-sm rounded mb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Eskils&nbsp;Blogg
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-2">
            <Nav.Link as={NavLink} to="/posts">
              Inlägg
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={NavLink} to="/admin">
                Admin
              </Nav.Link>
            )}

            {/* Auth‑länk */}
            {isLoggedIn ? (
              <Nav.Link onClick={logout} style={{ cursor: "pointer" }}>
                Logga ut
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Logga in
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
