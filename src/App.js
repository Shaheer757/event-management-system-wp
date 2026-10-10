import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './redux/slices/authSlice';

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Redux Test</h1>
      <p>Logged in: {isAuthenticated ? "Yes" : "No"}</p>
      <p>User: {user ? user.name : "None"}</p>

      <button onClick={() => dispatch(login({ name: "Shaheer" }))}>
        Log In
      </button>
      <button onClick={() => dispatch(logout())}>
        Log Out
      </button>
    </div>
  );
}

export default App;