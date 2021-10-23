import { React } from 'react';
import { Link } from 'react-router-dom';
import Post from '../Post';

const Posts = () => (
  <div>
    <h1>Here you can see Posts</h1>
    <Link to="/post/123">
      <Post id={123} />
    </Link>
  </div>
);

export default Posts;
