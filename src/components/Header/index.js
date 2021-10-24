import React from 'react';
import {
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './index.scss';

import logo from '../../assets/images/logo.png';

export const Header = () => (
  <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand as={Link} to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav>

        <Nav>
          <NavDropdown title="Profile" id="collasible-nav-dropdown" align="end">
            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/log-out">Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
