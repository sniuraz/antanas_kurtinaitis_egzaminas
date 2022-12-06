import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Main from './components/Main';
import Cart from './components/Cart';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
