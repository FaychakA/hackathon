import React, { useState } from 'react';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { loginUserThunk } from '../../redux/slices/user/asyncThunks';

import './index.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
            <Form.Label>{t('login.login')}</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !login,
                'is-valid': login,
              })}
              type="login"
              placeholder={t('login.loginPlaceholder')}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t('login.password')}</Form.Label>
            <Form.Control
              className={cn({
                'is-invalid': !password,
                'is-valid': password,
              })}
              type="password"
              placeholder={t('login.passwordPlaceholder')}
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
          <Button
            variant="primary"
            type="submit"
            onClick={onSubmit}
            disabled={!login || !password}
          >
            {t('login.submit')}
          </Button>
          <p className="sign-in__switch">
            {'Switch to '}
            <Link to="/sign-up">SIGN UP</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};
