import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row, Col, Pagination, Form, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Post from '../../components/Post';

import './index.scss';

import { createNewPost, fetchPostsList, fetchPost } from '../../redux/slices/posts/asyncThunks';

const formInit = {
  title: '',
  content: '',
  postPic: '',
  postId: uuidv4(),
};

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [form, setForm] = useState(formInit);
  const { allIds: allPostsId } = useSelector((state) => state.posts);
  const postsPerPage = 8;
  const totalPages = allPostsId.length / postsPerPage;

  const handleAddPost = (e) => {
    e.preventDefault();
    dispatch(createNewPost({
      postId: uuidv4(),
      ...form,
    })).then(() => {
      dispatch(fetchPost(form.postId));
    });
    setForm({ ...formInit, postId: uuidv4() });
  };

  const handlePagination = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(fetchPostsList());
  }, []);

  return (
    <Row>
      <Form onSubmit={(e) => handleAddPost(e)} style={{ borderBottom: '2px solid #eee', paddingBottom: 50 }}>
        <h2>Here you can add new post</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Your post"
            style={{ height: '100px' }}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Image link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert link"
            value={form.postPic}
            onChange={(e) => setForm({ ...form, postPic: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <h1>Here you can see Posts</h1>
        <Row xs={1} md={2} lg={3}>
          {[...allPostsId
            .slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage)]
            .map((postId) => (
              <Col key={postId} className="mb-4"><Link className="posts__link" to={`/post/${postId}`}><Post postId={postId} /></Link></Col>
            ))}
        </Row>
        <Row>
          <Col>
            <Pagination>
              <Pagination.First
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              />
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              />
              {
              [...new Array(Math.ceil(totalPages))]
                .map((it, index) => index).map((it, index) => (
                  <Pagination.Item
                    key={it}
                    onClick={() => handlePagination(index + 1)}
                    active={currentPage === index + 1}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))
            }
              <Pagination.Next
                disabled={currentPage === Math.ceil(totalPages)}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              />
              <Pagination.Last
                disabled={currentPage === Math.ceil(totalPages)}
                onClick={() => setCurrentPage(Math.ceil(totalPages))}
              />
            </Pagination>
          </Col>
        </Row>
      </div>
    </Row>
  );
};
export default Posts;
