import { Outlet, useNavigate } from 'react-router-dom';
import { AdminHeaders, PrimaryButton } from './CommonStyled';

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        Prekės
        <PrimaryButton onClick={() => navigate('/admin/products/create-product')}>Sukurti</PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Products;

