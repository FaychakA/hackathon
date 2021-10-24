import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { removePost } from '../../redux/slices/posts/asyncThunks';

import './index.scss';

const Post = ({ postId, isVisibleContent }) => {
  const dispatch = useDispatch();
  const requiredPostId = (postId);
  const { byId: postsById } = useSelector((state) => state.posts);

  const deletePost = () => {
    dispatch(removePost(postId));
  };

  return (
    <div className="post">
      <Card className="post__item">
        <Card.Img variant="top" src={postsById[requiredPostId]?.postPic} />
        <button className="post__delete" type="button" onClick={deletePost}>delete</button>
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
