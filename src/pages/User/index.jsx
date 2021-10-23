import { React, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  Col, Container, Row,
} from 'react-bootstrap';
import { fetchUserThunk } from '../../redux/slices/users/asyncThunks';

const User = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { users } = useSelector((state) => state.user);

  // fetch user
  useEffect(() => {
    dispatch(fetchUserThunk(id));
  }, []);

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
        </Row>
      </Container>
    </div>
  );
};

export default User;
