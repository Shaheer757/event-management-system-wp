import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      setError('Please fill in both fields.');
      return;
    }

    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
      setError('Invalid email or password.');
      return;
    }

    dispatch(login({ name: matchedUser.name, email: matchedUser.email }));
    navigate('/');
  }

  return (
    <div>
      <h2 className= "mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className= "mb-3">
          <label className="fw-bold">Email:</label>
          <input type="email" value={email} style={{backgroundColor: '#A5D6A7',borderRadius: '10px', marginLeft: '42px'}} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className= "mb-4">
          <label className="fw-bold">Password:  {"  "}</label>
          <input type="password" value={password} style={{backgroundColor: '#A5D6A7',borderRadius: '10px', marginLeft: '10px'}} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{backgroundColor: '#A5D6A7', borderRadius: '10px'}}>Login</button>
      </form>
    </div>
  );
}

export default Login;