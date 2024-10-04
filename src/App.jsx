import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OrderListPage from "./pages/order/OrderListPage.jsx";
import ProductListPage from "./pages/product/ProductListPage.jsx";
import ProductEditPage from "./pages/product/ProductEditPage.jsx";
import UserListPage from "./pages/user/UserListPage.jsx";
import InventoryListPage from "./pages/inventory/InventoryListPage.jsx";
import VendorListPage from "./pages/vendor/VendorListPage.jsx";

import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
                                <Route
                                    path="/"
                                    element={
                                        <ProtectedRoute roles={['Administrator', 'Vendor', 'CSR']}>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/products"
                                    element={
                                        <ProtectedRoute roles={['Administrator', 'Vendor', 'CSR']}>
                                            <ProductListPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/products/edit/:id"
                                    element={
                                        <ProtectedRoute roles={['Administrator']}>
                                            <ProductEditPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/users"
                                    element={
                                        <ProtectedRoute roles={['Administrator']}>
                                            <UserListPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/vendors"
                                    element={
                                        <ProtectedRoute roles={['Administrator']}>
                                            <VendorListPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/inventory"
                                    element={
                                        <ProtectedRoute roles={['Administrator']}>
                                            <InventoryListPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/orders"
                                    element={
                                        <ProtectedRoute roles={['Administrator', 'Vendor', 'CSR']}>
                                            <OrderListPage />
                                        </ProtectedRoute>
                                    }
                                />
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
