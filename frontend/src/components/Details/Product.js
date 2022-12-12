import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { setHeaders, url } from '../../slices/api';
import { addToCart } from '../../slices/cartSlice';

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/products/find/${params.id}`, setHeaders());

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    fetchData();
  }, [params.id]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };

  return (
    <StyledProduct>
      <ProductContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ImageContainer>
              <img src={product.image?.url} alt={product.name} />
            </ImageContainer>
            <ProductDetails>
              <h3>{product.name}</h3>
              <p>
                <span>Prekės ženklas:</span> {product.brand}
              </p>
              <p>
                <span>Apibūdinimas:</span> {product.desc}
              </p>
              <Price>{product.price?.toLocaleString()} &euro;</Price>
              <button className='product-add-to-cart' onClick={() => handleAddToCart(product)}>
                Į krepšelį
              </button>
            </ProductDetails>
          </>
        )}
      </ProductContainer>
    </StyledProduct>
  );
};

export default Product;

const StyledProduct = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  margin-top: 8.5rem;
`;

const ProductContainer = styled.div`
  max-width: 800px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  padding-bottom: 4rem;
`;

const ImageContainer = styled.div`
  flex: 3;

  img {
    width: 100%;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  margin-left: 2rem;

  h3 {
    font-size: 35px;
  }

  p span {
    font-weight: bold;
  }
`;

const Price = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 25px;
`;
