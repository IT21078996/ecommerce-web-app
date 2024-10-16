import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import {useAuth} from "./AuthContext.jsx";

const baseUrl = import.meta.env.VITE_BASE_URL;
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const {user} = useAuth();
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products by vendor
    const fetchVendorProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            let response;

            if (user.role === 'Vendor') {
                response = await axios.get(`${baseUrl}/Product/vendor/${user.id}`);
            } else if (user.role === 'Administrator' || user.role === 'CSR') {
                response = await axios.get(`${baseUrl}/Product`);
            } else {
                throw new Error('Unauthorized role');
            }

            setProducts(response.data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    // Fetch existing products
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/Product`);
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Create new product
    const createProduct = async (productData) => {
        try {
            const response = await axios.post(`${baseUrl}/Product`, productData);
            setProducts((prevProducts) => [...prevProducts, response.data]); // Add new product to state
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    };

    // Update an existing product
    const updateProduct = async (id, updatedData) => {
        try {
            const response = await axios.put(`${baseUrl}/Product/${id}`, updatedData);

            if (response.status === 200) {
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === id ? response.data : product
                    )
                );
            } else {
                console.error('Error: Product update failed');
            }

            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    };

    // Delete a product by ID
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${baseUrl}/Product/${id}`);
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    };

    // Activate a product
    const activateProduct = async (id) => {
        try {
            const response = await axios.patch(`${baseUrl}/product/activate/${id}`);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id ? { ...product, isActive: true } : product
                )
            );
            setMessage({ type: 'success', text: response.data.message });
        } catch (error) {
            console.error('Error activating product:', error);
            setMessage({ type: 'error', text: 'Error activating product' });
        }
    };

    // Deactivate a product
    const deactivateProduct = async (id) => {
        try {
            const response = await axios.patch(`${baseUrl}/product/deactivate/${id}`);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id ? { ...product, isActive: false } : product
                )
            );
            setMessage({ type: 'success', text: response.data.message });
        } catch (error) {
            console.error('Error deactivating product:', error);
            setMessage({ type: 'error', text: 'Error deactivating product' });
        }
    };

    // Clear notification message after 5 seconds
    const clearMessage = () => {
        setTimeout(() => setMessage(null), 5000);
    };

    return (
        <ProductContext.Provider value={{
            products,
            fetchProducts,
            createProduct,
            updateProduct,
            deleteProduct,
            activateProduct,
            deactivateProduct,
            message,
            clearMessage,
            fetchVendorProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
