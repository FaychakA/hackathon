import React, { useState, useEffect, useMemo } from 'react';
import {
  Row, Col, Pagination, Form, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Post from '../../components/Post';

import './index.scss';

import { CreatePost } from '../../components/CreatePost';

import { fetchPostsList } from '../../redux/slices/posts/asyncThunks';

const Posts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { byId: allPostsById } = useSelector((state) => state.posts);
  const postsArr = Object.values(allPostsById);
  const totalPages = postsArr.length / postsPerPage;
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('age');
  const [isVisibleEditor, setIsVisibleEditor] = useState(false);

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

  useEffect(() => {
    dispatch(fetchPostsList());
  }, []);

  const onCreatePost = () => {
    setIsVisibleEditor(true);
  };

  return (
    <Row>
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
        <Row className="py-5">
          <Col>
            {!isVisibleEditor && <Button onClick={onCreatePost}>{t('addPost.createPost')}</Button>}
          </Col>
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
      {isVisibleEditor && (
      <Row>
        <Col>
          <CreatePost setIsVisibleEditor={setIsVisibleEditor} />
        </Col>
      </Row>
      )}
      <Row xs={1} md={2} lg={3}>
        {showPosts.length > 0 ? [...showPosts
          .slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage)]
          .map((post) => (
            <Col key={post.postId} className="mb-4"><Post postId={post.postId} /></Col>
          )) : (<h2 className="py-5">{t('addPost.result')}</h2>)}
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
    </Row>
  );
};

export default Posts;
