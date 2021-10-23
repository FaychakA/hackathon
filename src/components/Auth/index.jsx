import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Auth = (props) => {
  const { type } = props;
  const { isLogged } = useSelector((state) => state.user);

  if (type === 'public' && isLogged) {
    return <Redirect to="/" />;
  }
  if (type === 'private' && !isLogged) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

Auth.propTypes = {
  type: PropTypes.oneOf(['public', 'private']).isRequired,
};
