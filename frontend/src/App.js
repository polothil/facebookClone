import axios from 'axios';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import CreatePostPopup from './components/CreatePostPopup/CreatePostPopup';
import Activate from './pages/Home/Activate/Activate';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Reset from './pages/Reset/Reset';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';

function reducer(state, action) {
  switch (action.type) {
    case 'POSTS_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'POSTS_SUCCESS':
      return { ...state, loading: false, posts: action.payload, error: '' };

    case 'POSTS_ERROR':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

function App() {
  const { user } = useSelector((user) => ({ ...user }));
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: '',
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'POSTS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: 'POSTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.response,
      });
    }
  };

  console.log(posts);

  return (
    <div>
      {createPostVisible && (
        <CreatePostPopup user={user} setCreatePostVisible={setCreatePostVisible} />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path='/'
            element={<Home setCreatePostVisible={setCreatePostVisible} posts={posts} />}
          />
          <Route path='/activate/:token' element={<Activate />} exact />
          <Route path='/profile' element={<Profile />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
        <Route path='/reset' element={<Reset />} exact />
      </Routes>
    </div>
  );
}

export default App;
