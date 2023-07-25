import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home, Products,
  SingleProduct,
  About,
  Checkout,
  Cart,
  Error,
  PrivateRoute,
  AuthWrapper
} from './pages'
import { useProductsContext } from './context/products_context'

//dev - as7vkt1sc3ofva6e.us.auth0.com
//do_kYj97DsTzOnbJ4foq_YRud3tExrU5g35ImoeNSZH_7IeVkzfHWaUolTFU_edd
function App() {
  const { isSidebarOpen } = useProductsContext()

  return (
    <AuthWrapper>
      <BrowserRouter>
        <Navbar />
        {isSidebarOpen && <Sidebar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter >
    </AuthWrapper>
  )
}

export default App
