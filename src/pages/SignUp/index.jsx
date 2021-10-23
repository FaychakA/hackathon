import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import { registerUserThunk } from '../../redux/slices/users/asyncThunks';

import './index.scss';

export const SignUp = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUserThunk({
      login,
      password,
    }));
  };

  return (
    <Row className="sign-up">
      <Col md={{ span: 4, offset: 4 }}>
        <Form className="sign-up__form">
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
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
