import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../../components/Post';

import { fetchPostsList } from '../../redux/slices/posts/asyncThunks';

import './index.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state);

  // fetch posts
  useEffect(() => {
    dispatch(fetchPostsList('posts'));
  }, []);

  return (
    <div className="home">
      {posts.allIds.map((postId, i) => (
        <div className="home__item" key={postId}>
          <Post postId={postId} isVisibleContent={i !== 1 && i !== 2} />
        </div>
      ))}
    </div>
  );
};

export default Home;
