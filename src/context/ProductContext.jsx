import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

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

    return (
        <ProductContext.Provider value={{ products, fetchProducts, createProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
