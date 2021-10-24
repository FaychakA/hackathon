import React, { useState } from 'react';
import cn from 'classnames';
import { Button, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';
import PropTypes from 'prop-types';
import { createNewPost, fetchPost } from '../../redux/slices/posts/asyncThunks';

import './index.scss';

const FORM_INIT = {
  title: '',
  content: '',
  postPic: '',
  postId: uuidv4(),
};

export const CreatePost = ({ setIsVisibleEditor }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(FORM_INIT);
  const { login } = useSelector((state) => state.user);

  const handleAddPost = (e) => {
    e.preventDefault();
    dispatch(createNewPost({
      postId: uuidv4(),
      updatedAt: Date.now(),
      createdBy: login,
      ...form,
    })).then(() => {
      dispatch(fetchPost(form.postId));
    });
    setForm(FORM_INIT);
    setIsVisibleEditor(false);
  };

  const handleInputFile = (e) => {
    setForm({ ...form, postPic: e.base64 });
  };

  return (
    <Form className="create-post" onSubmit={(e) => handleAddPost(e)}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          className={cn({
            'is-invalid': !form.title,
            'is-valid': form.title,
          })}
          type="text"
          placeholder="Enter title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formContent">
        <Form.Label>Text</Form.Label>
        <Form.Control
          className={cn({
            'is-invalid': !form.content,
            'is-valid': form.content,
          })}
          as="textarea"
          placeholder="Your post"
          style={{ height: '100px' }}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImage">
        <FileBase64
          multiple={false}
          onDone={(e) => handleInputFile(e)}
        />
      </Form.Group>
      <div className="create-post__buttons">
        <Button
          variant="primary"
          type="submit"
          disabled={form.postId || form.content || form.postPic}
        >
          Submit
        </Button>
        <Button variant="secondary" type="button" onClick={() => setIsVisibleEditor(false)}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

CreatePost.propTypes = {
  setIsVisibleEditor: PropTypes.func.isRequired,
};
