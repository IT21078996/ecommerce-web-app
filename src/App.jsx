import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

import Login from "./pages/Login.jsx";
import OrderListPage from "./pages/order/OrderListPage.jsx";
import ProductListPage from "./pages/product/ProductListPage.jsx";
import ProductEditPage from "./pages/product/ProductEditPage.jsx";
import UserListPage from "./pages/user/UserListPage.jsx";
import InventoryListPage from "./pages/inventory/InventoryListPage.jsx";
import VendorListPage from "./pages/vendor/VendorListPage.jsx";

import Layout from "./components/Layout.jsx";

import './styles/globals/global.css';


function App() {

  return (
    <>
        <AuthProvider>
            <ProductProvider>
                <OrderProvider>
                    <BrowserRouter>
                        <Layout>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/products" element={<ProductListPage />} />
                                <Route path="/products" element={<ProductListPage />} />
                                <Route path="/products/edit/:id" element={<ProductEditPage />} />
                                <Route path="/users" element={<UserListPage />} />
                                <Route path="/vendors" element={<VendorListPage />} />
                                <Route path="/inventory" element={<InventoryListPage />} />
                                <Route path="/orders" element={<OrderListPage />} />
                            </Routes>
                        </Layout>
                    </BrowserRouter>
                </OrderProvider>
            </ProductProvider>
        </AuthProvider>
    </>
  )
}

export default App
