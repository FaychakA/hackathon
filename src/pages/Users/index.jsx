import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import { fetchUsersIdsThunk } from '../../redux/slices/users/asyncThunks';

import './index.scss';

import guestPic from '../../assets/images/guest-user.jpeg';

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  // fetch user
  useEffect(() => {
    dispatch(fetchUsersIdsThunk());
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Row xs={1} md={2} lg={3}>
        {users.allIds.map((id) => (
          <Col key={id} className="mb-4">
            <Row className="users__wrap">
              <Col className="d-flex flex-column users__inner">
                <img
                  className="users__avatar"
                  src={users.byId[id]?.profilePic ? users.byId[id].profilePic : guestPic}
                  alt="user face"
                />
                <h3 className="users__name"><Link to={`user/${id}`}>{id}</Link></h3>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Users;
