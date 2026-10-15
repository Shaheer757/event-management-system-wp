import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/slices/authSlice';

function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError('All fields are required.');
      return;
    }

    const emailExists = users.some((u) => u.email === email);
    if (emailExists) {
      setError('An account with this email already exists.');
      return;
    }

    dispatch(register({ name, email, password }));
    navigate('/login');
  }

  return(
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
         <label>Name:</label>
         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
         <label>Email:</label>
         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
         <label>Password:</label>
         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div> 
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;