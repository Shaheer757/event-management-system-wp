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
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 fw-bold">
         <label>Name:</label>
         <input type="text" style={{backgroundColor: '#A5D6A7',borderRadius: '10px', marginLeft: '41px'}}  value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3 fw-bold">
         <label>Email:</label>
         <input type="email" style={{backgroundColor: '#A5D6A7',borderRadius: '10px', marginLeft: '45px'}}  value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4 fw-bold">
         <label>Password:</label>
         <input type="password" style={{backgroundColor: '#A5D6A7',borderRadius: '10px', marginLeft: '13px'}} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div> 
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{backgroundColor: '#A5D6A7',borderRadius: '10px'}} >Register</button>
      </form>
    </div>
  );
}

export default Register;