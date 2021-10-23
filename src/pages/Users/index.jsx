import { React } from 'react';
import { Link } from 'react-router-dom';

const Users = () => (
  <div>
    <h1>Users</h1>
    <Link to="user/123">User 123</Link>
  </div>
);

export default Users;
