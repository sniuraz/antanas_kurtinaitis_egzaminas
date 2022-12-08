import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../slices/cartSlice';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className='container'>
      <div className='cart-container'>
        <h2>Pirkinių krepšelis</h2>
        {cart.cartItems.length === 0 ? (
          <div className='cart-empty'>
            <p>Krepšelis tuščias</p>
            <div className='start-shopping'>
              <Link to='/'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-arrow-left'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                  />
                </svg>
                <span>Pradėti apsipirkimą</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className='titles'>
              <h3 className='title'>Pavadinimas</h3>
              <h3 className='price'>Kaina</h3>
              <h3 className='quantity'>Kiekis</h3>
              <h3 className='total'>Viso</h3>
            </div>
            <div className='cart-items'>
              {cart.cartItems?.map((cartItem) => (
                <div className='cart-item' key={cartItem._id}>
                  <div className='cart-product'>
                    <img src={cartItem.image?.url} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.description}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>Ištrinti</button>
                    </div>
                  </div>
                  <div className='cart-product-price'>{cartItem.price} &euro;</div>
                  <div className='cart-product-quantity'>
                    <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                    <div className='count'>{cartItem.cartQuantity}</div>
                    <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                  </div>
                  <div className='cart-product-total-price'>{cartItem.price * cartItem.cartQuantity} &euro;</div>
                </div>
              ))}
            </div>
            <div className='cart-summary'>
              <button className='clear-cart' onClick={() => handleClearCart()}>
                Išvalyti krepšelį
              </button>
              <div className='cart-checkout'>
                <div className='subtotal'>
                  <span>Tarpinė suma</span>
                  <span className='amount'>{cart.cartTotalAmount} &euro;</span>
                </div>
                <p>Mokesčiai ir siuntimas apskaičiuojami atsiskaitant</p>
                {auth._id ? (
                  <button className='cart-login' onClick={() => navigate('/login')}>
                    Pasitikrinti
                  </button>
                ) : (
                  <button>Prisijungti pasitikrinti</button>
                )}

                <div className='continue-shopping'>
                  <Link to='/'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      fill='currentColor'
                      className='bi bi-arrow-left'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                      />
                    </svg>
                    <span>Tęsti apsipirkimą</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
