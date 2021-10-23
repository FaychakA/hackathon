import { React } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Post from '../Post';

import './index.scss';

import { posts } from '../../testData/post.json';

const Posts = () => (
  <Row xs={1} md={2} lg={3}>
    {posts.map((post) => (
      <Col key={post.id} className="mb-4"><Link className="posts__link" to={`/post/${post.id}`}><Post postId={post.id} /></Link></Col>
    ))}
  </Row>
);

export default Posts;
