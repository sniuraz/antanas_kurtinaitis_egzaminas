import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { setHeaders, url } from '../../slices/api';
import { toast } from 'react-toastify';

const User = () => {
  const params = useParams();

  const [user, setUser] = useState({
    name: '',
    email: '',
    isAdmin: false,
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${url}/users/find/${params.id}`, setHeaders());

        setUser({
          ...res.data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
    setLoading(false);
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await axios.put(`${url}/users/${params.id}`, { ...user }, setHeaders());

      setUser({ ...res.data, password: '' });
      toast.success('Profilis atnaujintas', {
        position: 'bottom-center',
      });
    } catch (err) {
      console.log(err);
    }

    setUpdating(false);
  };

  return (
    <StyledProfile>
      <ProfileContainer>
        {loading ? (
          <p>Kraunasi...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Vartotojo profilis</h3>
            {user.isAdmin ? <Admin>Administratorius</Admin> : <Customer>Paprastas vartotojas</Customer>}
            <label htmlFor='name'>Vardas:</label>
            <input
              type='text'
              id='name'
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label htmlFor='email'>El. paštas:</label>
            <input
              type='text'
              id='email'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <button>{updating ? 'Naujinama' : 'Atnaujinti profilį'}</button>
          </form>
        )}
      </ProfileContainer>
    </StyledProfile>
  );
};

export default User;

const StyledProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3 {
      margin-bottom: 0.5rem;
    }

    label {
      margin-bottom: 0.2rem;
      color: grey;
    }

    input {
      margin-bottom: 1rem;
      outline: none;
      border: none;
      border-bottom: 1px solid grey;
    }
  }
`;

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`;