import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Pagination } from 'react-bootstrap';
import './index.scss';
import Post from '../Post';
import { posts } from '../../testData/post.json';

const Posts = () => {
  const postsPerPage = 8;
  const totalPages = posts.length / postsPerPage;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (e) => {
    setCurrentPage(e);
  };
  return (
    <div>
      <h1>Here you can see Posts</h1>
      <Row xs={1} md={2} lg={3}>
        {[...posts.slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage)]
          .map((post) => (
            <Col key={post.id} className="mb-4"><Link className="posts__link" to={`/post/${post.id}`}><Post postId={post.id} /></Link></Col>
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
  );
};
export default Posts;
