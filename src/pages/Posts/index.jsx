import React, { useState, useEffect, useMemo } from 'react';
import {
  Row, Col, Pagination, Form, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import FileBase64 from 'react-file-base64';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState(formInit);
  const { byId: allPostsById } = useSelector((state) => state.posts);
  const postsArr = Object.values(allPostsById);
  const totalPages = postsArr.length / postsPerPage;
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('age');

  const handleAddPost = (e) => {
    e.preventDefault();
    dispatch(createNewPost({
      postId: uuidv4(),
      updatedAt: Date.now(),
      ...form,
    })).then(() => {
      dispatch(fetchPost(form.postId));
    });
    setForm(formInit);
  };

  const showPosts = useMemo(() => {
    if (postsArr && postsArr.length > 0) {
      const searchQueryToLowerCase = search.toLowerCase();

      switch (sort) {
        case 'age':
          postsArr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          break;
        case 'age-reverse':
          postsArr.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
          break;
        case 'abc':
          postsArr.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'abc-reverse':
          postsArr.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default: {
          return postsArr;
        }
      }

      return postsArr.filter((it) => it.title.toLowerCase().includes(searchQueryToLowerCase)
      || it.content.toLowerCase().includes(searchQueryToLowerCase));
    }
    return [];
  }, [postsArr, search, sort]);

  const handleInputFile = (e) => {
    setForm({ ...form, postPic: e.base64 });
  };

  useEffect(() => {
    dispatch(fetchPostsList());
  }, []);

  return (
    <Row>
      <Form onSubmit={(e) => handleAddPost(e)} style={{ borderBottom: '2px solid #eee', paddingBottom: 50 }}>
        <h2>{t('addPost.header')}</h2>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>{t('addPost.title')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('addPost.titlePlaceHolder')}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>{t('addPost.text')}</Form.Label>
          <Form.Control
            as="textarea"
            placeholder={t('addPost.textPlaceholder')}
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
        <Button variant="primary" type="submit">
          {t('addPost.submitButton')}
        </Button>
      </Form>
      <div>
        <h1>{t('posts.header')}</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Control
              type="text"
              placeholder={t('posts.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
          <Row style={{ width: 400 }} className="py-5">
            <Col>
              <Form.Select aria-label="Sort posts" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="age">{t('posts.select.byNew')}</option>
                <option value="age-reverse">{t('posts.select.byOld')}</option>
                <option value="abc">{t('posts.select.alphabet')}</option>
                <option value="abc-reverse">{t('posts.select.alphabetReverse')}</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <Row xs={1} md={2} lg={3}>
          {showPosts.length > 0 ? [...showPosts
            .slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage)]
            .map((post) => (
              <Col key={post.postId} className="mb-4"><Post postId={post.postId} /></Col>
            )) : (<h2 className="py-5">No result</h2>)}
        </Row>
        {showPosts.length > postsPerPage && (
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
                    onClick={() => setCurrentPage(index + 1)}
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
        )}
      </div>
    </Row>
  );
};
export default Posts;
