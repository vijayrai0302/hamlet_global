import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CurrencyProvider } from './store/CurrencyContext'
import { ProductsProvider } from './store/ProductsContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import GemstonesPage from './pages/GemstonesPage'
import JewelleryPage from './pages/JewelleryPage'
import PreOwnedPage from './pages/PreOwnedPage'
import CustomPage from './pages/CustomPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <CurrencyProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="gemstones" element={<GemstonesPage />} />
              <Route path="gemstones/:id" element={<ProductDetailPage />} />
              <Route path="jewellery" element={<JewelleryPage />} />
              <Route path="jewellery/:id" element={<ProductDetailPage />} />
              <Route path="pre-owned" element={<PreOwnedPage />} />
              <Route path="pre-owned/:id" element={<ProductDetailPage />} />
              <Route path="custom" element={<CustomPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </CurrencyProvider>
  )
}
