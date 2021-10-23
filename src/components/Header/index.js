import React from 'react';
import {
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';

export const Header = () => (
  <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand href="/">Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/posts">Posts</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
        </Nav>

        <Nav>
          <NavDropdown title="Profile" id="collasible-nav-dropdown" align="end">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/log-out">Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
