import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/slices/authSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import MyEvents from './pages/MyEvents';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light px-4" style={{backgroundColor: '#A5D6A7'}}>
        <Link className="navbar-brand fw-bold" to="/">Event Management System</Link>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <Link className="nav-link text-black fw-bold" to="/">Events</Link>
          {isAuthenticated ? (
            <>
              <Link className="nav-link text-black fw-bold" to="/my-events">My Events</Link>
              <button
                className="btn btn-outline-dark fw-bold btn-sm"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link text-black fw-bold" to="/login">Login</Link>
              <Link className="nav-link text-black fw-bold" to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/my-events" element={<MyEvents />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;