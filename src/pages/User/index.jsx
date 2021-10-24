import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Row,
} from 'react-bootstrap';

import { fetchUserThunk } from '../../redux/slices/users/asyncThunks';
import { changeBanStatus } from '../../redux/slices/user';

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
        <Col>{users.byId[id]?.profilePic && <img src={users.byId[id].profilePic} alt="user face" />}</Col>
        <Col>
          <Row>
            <Col>{`Name: ${users.byId[id]?.name || ''}`}</Col>
          </Row>
          <Row>
            <Col>{`Role: ${users.byId[id]?.role || ''}`}</Col>
          </Row>
          <Row>
            <Col>{`Mail: ${users.byId[id]?.mail || ''}`}</Col>
          </Row>
          <Row>
            {users.byId[id]?.bio && <Col>{`Bio: ${users.byId[id].bio || ''}`}</Col>}
          </Row>
        </Col>
        {users.byId[login]?.role === 'admin' && users.byId[id]?.role !== 'admin' && (
          <Col>
            {bannedUsers.includes(id) ? (
              <Button onClick={handleChangeBanStatus}>Unban user</Button>
            ) : (
              <Button onClick={handleChangeBanStatus}>Ban user</Button>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default User;
