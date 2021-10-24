import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { removePost } from '../../redux/slices/posts/asyncThunks';

import './index.scss';

const Post = ({ postId, isVisibleContent }) => {
  const dispatch = useDispatch();
  const requiredPostId = (postId);
  const currentPost = useSelector((state) => state.posts.byId[requiredPostId]);
  const { login } = useSelector((state) => state.user);

  const deletePost = () => {
    dispatch(removePost(postId));
  };

  return (
    <div className="post">
      {currentPost?.createBy === login && (
      <button className="post__delete" type="button" onClick={deletePost}>
        <FaTrash />
      </button>
      )}
      <Link className="posts__link" to={`/post/${postId}`}>
        <Card className="post__item">
          <Card.Img variant="top" src={currentPost?.postPic} />
          <Card.Body>
            <h2>{currentPost?.title}</h2>
            {isVisibleContent && <Card.Text>{currentPost?.content}</Card.Text>}
          </Card.Body>
        </Card>
      </Link>
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
