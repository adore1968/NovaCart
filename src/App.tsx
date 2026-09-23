import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";
import CartProvider from "./context/cart/CartProvider";
import ProductsProvider from "./context/products/ProductsProvider";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import AdminRoute from "./components/AdminRoute";
import AdminProductsPage from "./pages/AdminProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <Navbar />
          <main className="container py-5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route
                  path="/admin/add-product"
                  element={<CreateProductPage />}
                />
                <Route
                  path="/admin/edit-product/:id"
                  element={<EditProductPage />}
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
