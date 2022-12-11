import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Main from './components/Main';
import Cart from './components/Cart';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import CreateProduct from './components/admin/CreateProduct';
import ProductsList from './components/admin/list/ProductsList';
import Users from './components/admin/Users';
import Product from './components/Details/Product';
import User from './components/Details/User';
import CheckoutSuccess from './components/CheckoutSuccess';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/admin' element={<Dashboard />}>
            <Route path='products' element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path='create-product' element={<CreateProduct />} />
            </Route>
            <Route path='users' element={<Users />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
