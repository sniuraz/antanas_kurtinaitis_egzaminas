import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { logoutUser } from '../slices/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  return (
    <div className='header'>
      <div className='container'>
        <nav className='nav-bar'>
          <Link to='/'>
            <h2>shopifis</h2>
          </Link>
          <Link to='/cart'>
            <div className='nav-bag'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='36'
                height='36'
                fill='currentColor'
                className='bi bi-basket3-fill'
                viewBox='0 0 16 16'
              >
                <path d='M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z' />
              </svg>
              <span className='bag-quantity'>
                <span>{cartTotalQuantity}</span>
              </span>
            </div>
          </Link>
          {auth._id ? (
            <Links>
              {auth.isAdmin ? (
                <div>
                  <Link to='/admin/products'>{auth.name}</Link>
                </div>
              ) : (
                <div>{auth.name}</div>
              )}
              <div
                onClick={() => {
                  dispatch(logoutUser(null));
                  toast.warning(`${auth.name} atsijungė`, { position: 'bottom-center' });
                }}
              >
                Atsijungti
              </div>
            </Links>
          ) : (
            <AuthLinks>
              <Link to='/login'>Prisijungti</Link>
              <Link to='/register'>Registruotis</Link>
            </AuthLinks>
          )}
        </nav>
      </div>
    </div>
  );
}

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;
