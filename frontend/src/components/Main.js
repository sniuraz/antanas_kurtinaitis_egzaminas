import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

export default function Main() {
  const { items: data, status } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className='container'>
      <div className='home-container'>
        {status === 'success' ? (
          <>
            <h2>Naujos prekės</h2>
            <div className='products'>
              {data &&
                data?.map((product) => (
                  <div key={product._id} className='product'>
                    <h3>{product.name}</h3>
                    <img src={product.image.url} alt={product.name} />
                    <div className='details'>
                      <span>{product.desc}</span>
                      <span className='price'>{product.price} &euro;</span>
                    </div>
                    <button onClick={() => handleAddToCart(product)}>Į krepšelį</button>
                  </div>
                ))}
            </div>
          </>
        ) : status === 'pending' ? (
          <p>Kraunasi...</p>
        ) : (
          <p>Netikėta klaida...</p>
        )}
      </div>
    </div>
  );
}
