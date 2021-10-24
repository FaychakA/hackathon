import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Row,
} from 'react-bootstrap';

import { fetchUserThunk } from '../../redux/slices/users/asyncThunks';
import { changeBanStatus } from '../../redux/slices/user';

import './index.scss';

const User = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { login, bannedUsers } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state);

  // fetch user
  useEffect(() => {
    dispatch(fetchUserThunk(id));
    dispatch(fetchUserThunk(login));
  }, []);

  const handleChangeBanStatus = () => {
    dispatch(changeBanStatus(id));
  };

  return (
    <div>
      <Row>
        <Col>{users.byId[id]?.profilePic && <img className="user__avatar" src={users.byId[id].profilePic} alt="user face" />}</Col>
        <Col>
          <div className="user__border">
            <Row>
              <Col><h1>{`Name: ${users.byId[id]?.name || ''}`}</h1></Col>
            </Row>
            <Row>
              <Col><h3>{`Role: ${users.byId[id]?.role || ''}`}</h3></Col>
            </Row>
            <Row>
              <Col><h3>{`Mail: ${users.byId[id]?.mail || ''}`}</h3></Col>
            </Row>
            <Row>
              {users.byId[id]?.bio && <Col><h3>{`Bio: ${users.byId[id].bio || ''}`}</h3></Col>}
            </Row>
            {users.byId[login]?.role === 'admin' && users.byId[id]?.role !== 'admin' && (
            <Row>
              {bannedUsers.includes(id) ? (
                <Button onClick={handleChangeBanStatus}>Unban user</Button>
              ) : (
                <Button onClick={handleChangeBanStatus}>Ban user</Button>
              )}
            </Row>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default User;
