import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import FileBase64 from 'react-file-base64';
import { registerUserThunk } from '../../redux/slices/users/asyncThunks';

import './index.scss';

// eslint-disable-next-line
const pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

export const SignUp = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setprofilePic] = useState('');
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserThunk({
      login,
      email,
      name,
      password,
      profilePic,
    }));
    history.push('/');
  };

  return (
    <Row className="sign-up">
      <Col md={{ span: 4, offset: 4 }}>
        <Form className="sign-up__form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !login,
                'is-valid': login,
              })}
              type="login"
              placeholder="Enter login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !email || !pattern.test(email),
                'is-valid': email || pattern.test(email),
              })}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !name,
                'is-valid': name,
              })}
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Upload image</Form.Label>
            <FileBase64
              multiple={false}
              onDone={(e) => setprofilePic(e.base64)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !password,
                'is-valid': password,
              })}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !confirmPassword || password !== confirmPassword,
                'is-valid': confirmPassword || password === confirmPassword,
              })}
              type="password"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={onSubmit}
            disabled={
              !login
              || !name
              || !email
              || !pattern.test(email)
              || !password
              || !confirmPassword
              || password !== confirmPassword
}
          >
            Submit
          </Button>
          <p className="sign-up__switch">
            {'Switch to '}
            <Link to="/sign-in">SIGN IN</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};
