import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../slices/authSlice';
import { StyledForm } from './StyledForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  useEffect(() => {
    if (auth._id) {
      navigate('/');
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Prisijungti</h2>
        <input
          type='email'
          placeholder='Elektroninis paštas'
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type='password'
          placeholder='Slaptažodis'
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>{auth.loginStatus === 'Kraunasi' ? 'Pateikiama' : 'Prisijungti'}</button>

        {auth.loginStatus === 'rejected' ? <p>{auth.loginError}</p> : null}
      </StyledForm>
    </>
  );
};

export default Login;
