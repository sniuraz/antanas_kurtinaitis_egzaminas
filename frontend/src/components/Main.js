import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useGetAllProductsQuery } from '../slices/productsApi';

export default function Main() {
  const { data, error, isLoading } = useGetAllProductsQuery();

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className='container'>
      <div className='home-container'>
        {isLoading ? (
          <p>Įkeliama...</p>
        ) : error ? (
          <p>Įvyko klaida...</p>
        ) : (
          <>
            <h2>Naujos prekės</h2>
            <div className='products'>
              {data?.map((product) => (
                <div key={product.id} className='product'>
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className='details'>
                    <span>{product.desc}</span>
                    <span className='price'>{product.price} &euro;</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>Į krepšelį</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
