import { React, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  Col, Container, Row,
} from 'react-bootstrap';
import { fetchUserThunk } from '../../redux/slices/users/asyncThunks';
import { changeBanStatus } from '../../redux/slices/users';

const User = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { users, bannedUsers, login } = useSelector((state) => state.user);
  console.log('state', useSelector((state) => state));

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
      <Container>
        <Row>
          <Col>{users[id]?.profilePic && <img src={users[id].profilePic} alt="user face" />}</Col>
          <Col>
            <Row>
              <Col>{`Name: ${users[id]?.name || ''}`}</Col>
            </Row>
            <Row>
              <Col>{`Role: ${users[id]?.role || ''}`}</Col>
            </Row>
            <Row>
              <Col>{`Mail: ${users[id]?.mail || ''}`}</Col>
            </Row>
            <Row>
              {users[id]?.bio && <Col>{`Bio: ${users[id].bio || ''}`}</Col>}
            </Row>
          </Col>
          {users[login]?.role === 'admin' && users[id]?.role !== 'admin' && (
          <Col>
            {bannedUsers.includes(id) ? (
              <button type="button" onClick={handleChangeBanStatus}>Unban user</button>
            ) : (
              <button type="button" onClick={handleChangeBanStatus}>Ban user</button>
            )}
          </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default User;
