import { React } from 'react';
import { useParams, useHistory } from 'react-router';
import Card from 'react-bootstrap/Card';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { posts } from '../../testData/post.json';

import './index.scss';

const Post = ({ postId }) => {
  const { id } = useParams();
  const { title, content, postPic } = posts.find((post) => post.id === (id || postId));
  const history = useHistory();

  return (
    <div className="post">
      {id && (
      <div className="post__button">
        <Button variant="dark" onClick={() => history.push('/posts')}>Back</Button>
      </div>
      )}

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
