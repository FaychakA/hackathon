import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { Header } from './components/Header';
import { Auth } from './components/Auth';

import { ROUTES } from './constants/routes';

import './App.scss';

export const App = () => (
  <Container className="app__container">
    <BrowserRouter>
      <Header />
      <Switch>
        {ROUTES.map(({
          path, exact, component, type,
        }) => (
          <Auth
            key={path}
            path={path}
            exact={exact}
            component={component}
            type={type}
          />
        ))}
      </Switch>
    </BrowserRouter>
  </Container>
);
