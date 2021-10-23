import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { fetchUsersIdsThunk } from '../../redux/slices/users/asyncThunks';

const Users = () => {
  const dispatch = useDispatch();
  const { allIds } = useSelector((state) => state.user);
  // fetch user
  useEffect(() => {
    dispatch(fetchUsersIdsThunk(''));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Row style={{ marginTop: '56px' }} xs={1} md={2} lg={3}>
        {allIds.map((id) => (
          <Col key={id} className="mb-4"><Link to={`user/${id}`}>{`User: ${id}`}</Link></Col>
        ))}
      </Row>
    </div>
  );
};

export default Users;
