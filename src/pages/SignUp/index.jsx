import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import FileBase64 from 'react-file-base64';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
            <Form.Label>{t('signUp.login')}</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !login,
                'is-valid': login,
              })}
              type="login"
              placeholder={t('signUp.loginPlaceholder')}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t('signUp.email')}</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !email || !pattern.test(email),
                'is-valid': email || pattern.test(email),
              })}
              type="email"
              placeholder={t('signUp.enterEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t('signUp.name')}</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !name,
                'is-valid': name,
              })}
              type="name"
              placeholder={t('signUp.enterName')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t('signUp.uploadImg')}</Form.Label>
            <FileBase64
              multiple={false}
              onDone={(e) => setprofilePic(e.base64)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t('signUp.password')}</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !password,
                'is-valid': password,
              })}
              type="password"
              placeholder={t('signUp.enterPassword')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t('signUp.confirmPassword')}</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !confirmPassword || password !== confirmPassword,
                'is-valid': confirmPassword || password === confirmPassword,
              })}
              type="password"
              placeholder={t('signUp.confirmPasswordPlaceholder')}
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
            {t('signUp.submit')}
          </Button>
          <p className="sign-up__switch">
            {'Switch to '}
            <Link to="/sign-in">{t('signUp.signIn')}</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};
