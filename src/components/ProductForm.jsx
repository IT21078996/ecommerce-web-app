import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import '../styles/components/ProductForm.css';

const ProductForm = ({ initialData = {}, onClose }) => {
    const { createProduct, updateProduct } = useProducts(); // Access the createProduct function
    const [product, setProduct] = useState({
        id: initialData.id || '',
        productName: initialData.productName || '',
        description: initialData.description || '',
        price: initialData.price || 0,
        stock: initialData.stock || 0,
        category: initialData.category || '',
        vendorId: initialData.vendorId || '66edabc4692d23e8ebfdec69',  // Need to replace with a logic to get vendorId
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
        rating: initialData.rating || 0,
        imageUrl: initialData.imageUrl || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await createProduct(product); // Call the createProduct function from context
    //         onClose(); // Close the form or handle post-save actions
    //     } catch (error) {
    //         console.error('Failed to create product:', error);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (initialData.id) {
                await updateProduct(initialData.id, product);
            } else {
                await createProduct(product);
            }
            onClose();
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="productName" value={product.productName} onChange={handleChange} placeholder="Product Name"
                   required/>
            <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description"
                      required/>
            <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price"
                   required/>
            <input name="stock" type="number" value={product.stock} onChange={handleChange} placeholder="Stock"
                   required/>
            <input name="category" value={product.category} onChange={handleChange} placeholder="Category" required/>
            <input name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" required/>
            <button type="submit">{initialData.id ? 'Update Product' : 'Save Product'}</button>
        </form>
    );
};

export default ProductForm;
