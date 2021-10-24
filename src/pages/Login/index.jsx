import React, { useState } from 'react';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { loginUserThunk } from '../../redux/slices/user/asyncThunks';

import './index.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckOut, setIsCheckout] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUserThunk({
      login,
      password,
      isCheckOut,
    }));
  };

  return (
    <Row className="sign-in">
      <Col md={{ span: 4, offset: 4 }}>
        <Form className="sign-in__form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="login"
              placeholder="Enter login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Check me out"
              checked={isCheckOut}
              onChange={(e) => setIsCheckout(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
