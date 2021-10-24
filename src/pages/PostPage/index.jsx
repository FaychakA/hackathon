import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Post from '../../components/Post';

import { fetchPost } from '../../redux/slices/posts/asyncThunks';
import { fetchUsersIdsThunk } from '../../redux/slices/users/asyncThunks';
import { createNewComment } from '../../redux/slices/comments/asyncThunks';

import './index.scss';

const formInit = {
  content: '',
  commentId: uuidv4(),
};

const PostPage = ({ postId }) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const requiredPostId = (id || postId);
  const [form, setForm] = useState(formInit);
  const { login } = useSelector((state) => state.user);
  const { posts, users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUsersIdsThunk());
    if (id) {
      dispatch(fetchPost(id));
    }
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    dispatch(createNewComment({
      commentData: {
        postId: id,
        userId: login,
        ...form,
      },
      postId: id,
    }));
    setForm({ ...formInit, commentId: uuidv4() });
  };

  return (
    <div className="post-page">
      {id && (
      <div className="post-page__button">
        <Button variant="dark" onClick={() => history.push('/posts')}>Back</Button>
      </div>
      )}

      <Post postId={requiredPostId} />

      <Row>
        <Form onSubmit={(e) => handleAddComment(e)}>
          <h2>Here you can add new comment</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter your comment"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>

      {posts.byId[id]?.comments && Object.keys(posts.byId[id]?.comments).length > 0
      && Object.keys(posts.byId[id]?.comments).reverse().map((commentId) => (
        <div className="post-page__comment" key={commentId}>
          <div className="post-page__user-info">
            <div>
              <img src={users.byId[posts.byId[id]?.comments[commentId].userId]?.profilePic} alt="user" />
            </div>
            <div className="post-page__user-name">
              {`Name: ${users.byId[posts.byId[id]?.comments[commentId].userId]?.name}`}
            </div>
          </div>
          <div className="post-page__comment-content">
            {posts.byId[id]?.comments[commentId]?.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPage;

PostPage.defaultProps = {
  postId: '',
};

PostPage.propTypes = {
  postId: PropTypes.string,
};
