import { React } from 'react';
import { useParams } from 'react-router';
import Card from 'react-bootstrap/Card';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { posts } from '../../testData/post.json';

import './index.scss';

const Post = ({ postId }) => {
  const { id } = useParams();
  const { title, content, postPic } = posts.find((post) => post.id === (id || postId));

  return (
    <div className="post">
      <Card className={cn({ 'post--single': id })}>
        <Card.Img variant="top" src={postPic} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;

Post.propTypes = {
  postId: PropTypes.string.isRequired,
};
