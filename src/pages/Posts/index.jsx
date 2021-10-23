import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Pagination } from 'react-bootstrap';
import './index.scss';

const posts = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
  {
    id: 11,
  },
  {
    id: 12,
  },
  {
    id: 13,
  },
  {
    id: 14,
  },
  {
    id: 15,
  },
  {
    id: 16,
  },
  {
    id: 17,
  },
  {
    id: 18,
  },
  {
    id: 19,
  },
  {
    id: 20,
  },
  {
    id: 21,
  },
  {
    id: 22,
  },
];

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
      <Row sm={{ cols: 2 }} md={{ cols: 4 }} className="justify-content-md-center" style={{ margin: '0 auto', maxWidth: 1200, width: '100%' }}>
        {[...posts.slice(currentPage * postsPerPage - postsPerPage, currentPage * postsPerPage)]
          .map((it) => (
            <Col style={{ marginBottom: 10 }}>
              <div
                key={it.id}
                style={{
                  width: 200, height: 200, background: 'pink', margin: '0 auto',
                }}
              >
                <Link to="/post/123">
                  <span>{it.id}</span>
                </Link>
              </div>
            </Col>
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
