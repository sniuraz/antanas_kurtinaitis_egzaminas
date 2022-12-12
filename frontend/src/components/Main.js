import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Main() {
  const { items: data, status } = useSelector((state) => state.products);

  return (
    <div className='container'>
      <div className='home-container'>
        {status === 'success' ? (
          <>
            <div className='banners'><p>Reklama</p></div>
            <div className='products'>
              {data &&
                data?.map((product) => (
                  <div key={product._id} className='product'>
                    <h3>{product.name}</h3>
                    <Link to={`/product/${product._id}`}>
                      <img src={product.image.url} alt={product.name} />
                    </Link>
                    <div className='details'>
                      <span>{product.desc}</span>
                      <span className='price'>{product.price} &euro;</span>
                    </div>
                    
                  </div>
                ))}
            </div>
            <div className='banners'><p>Reklama</p></div>
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
