import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import Card from 'react-bootstrap/Card';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPost } from '../../redux/slices/posts/asyncThunks';

import './index.scss';

const Post = ({ postId, isVisibleContent }) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const requiredPostId = (id || postId);
  const { byId: postsById } = useSelector((state) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPost(id));
    }
  }, []);

  return (
    <div className="post">
      {id && (
      <div className="post__button">
        <Button variant="dark" onClick={() => history.push('/posts')}>Back</Button>
      </div>
      )}

      <Card className={cn('post__item', { 'post__item--single': id })}>
        <Card.Img variant="top" src={postsById[requiredPostId]?.postPic} />
        <Card.Body>
          <h2>{postsById[requiredPostId]?.title}</h2>
          {isVisibleContent && <Card.Text>{postsById[requiredPostId]?.content}</Card.Text>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;

Post.defaultProps = {
  isVisibleContent: true,
};

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  isVisibleContent: PropTypes.bool,
};
