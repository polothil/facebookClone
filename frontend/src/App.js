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

function App() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <CreatePostPopup user={user} />
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path='/' element={<Home />} />
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
