import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  return <div>
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
    <Footer />
  </BrowserRouter>
</div>
}

export default App;
