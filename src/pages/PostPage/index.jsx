import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';

import Post from '../../components/Post';

import { fetchPost } from '../../redux/slices/posts/asyncThunks';

import './index.scss';

const PostPage = ({ postId }) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const requiredPostId = (id || postId);

  useEffect(() => {
    if (id) {
      dispatch(fetchPost(id));
    }
  }, []);

  return (
    <>
      {id && (
      <div className="post-page__button">
        <Button variant="dark" onClick={() => history.push('/posts')}>Back</Button>
      </div>
      )}

      <Post postId={requiredPostId} />
    </>
  );
};

export default PostPage;

PostPage.propTypes = {
  postId: PropTypes.string.isRequired,
};
