import React from 'react';
import {
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ChangeLangDropDown from '../../changeLangDropDown/ChangeLangDropDown';

import './index.scss';

import { logout } from '../../redux/slices/user';

import logo from '../../assets/images/logo.png';

export const Header = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="header__menu">
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">{t('header.links.home')}</Nav.Link>
            <Nav.Link as={Link} to="/posts">{t('header.links.posts')}</Nav.Link>
            <Nav.Link as={Link} to="/users">{t('header.links.users')}</Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown title={t('header.dropdown.profile')} id="collasible-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/profile">{t('header.links.profile')}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/log-out" onClick={handleLogOut}>{t('header.links.logOut')}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <ChangeLangDropDown />
      </Container>
    </Navbar>
  );
};
