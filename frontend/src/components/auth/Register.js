import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../slices/authSlice';
import { StyledForm } from './StyledForm';

const Register = () => {
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
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Registracija</h2>
        <input
          type='text'
          placeholder='Vartotojo vardas'
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
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
        <button>{auth.registerStatus === 'Kraunasi' ? 'Pateikiama' : 'Registruotis'}</button>

        {auth.registerStatus === 'rejected' ? <p>{auth.registerError}</p> : null}
      </StyledForm>
    </>
  );
};

export default Register;
