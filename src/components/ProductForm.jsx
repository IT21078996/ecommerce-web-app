import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useProducts } from '../context/ProductContext';
import '../styles/components/ProductForm.css';

const ProductForm = ({ initialData = {}, onClose }) => {
    const { createProduct, updateProduct } = useProducts();
    const { user } = useAuth();
    const [vendorId, setVendorId] = useState(initialData.vendorId || '');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [product, setProduct] = useState({
        id: initialData.id || '',
        productName: initialData.productName || '',
        description: initialData.description || '',
        price: initialData.price || 0,
        stock: initialData.stock || 0,
        category: initialData.category || '',
        vendorId: initialData.vendorId,
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
        rating: initialData.rating || 0,
        base64Image: initialData.base64Image || '',
    });

    // Fetch the vendorId based on the logged-in user's email
    useEffect(() => {
        const fetchVendorId = async () => {
            try {
                const response = await axios.get(`https://localhost:44358/api/User?email=${user.email}`);
                const userData = response.data;
                const matchedUser = userData.find(u => u.email === user.email);
                if (matchedUser) {
                    setVendorId(matchedUser.id); // Set vendorId after fetching the user by email
                    setProduct((prevProduct) => ({ ...prevProduct, vendorId: matchedUser.id })); // Update product with the vendorId
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching vendorId:', error);
            }
        };

        if (user && user.email) {
            fetchVendorId(); // Only fetch if the user is logged in
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);  // Set the selected file name
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct({ ...product, base64Image: reader.result });  // Convert image to base64
            };
            reader.readAsDataURL(file);
        }
    };

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
            <label htmlFor="productName">Product Name</label>
            <input id="productName" name="productName" value={product.productName} onChange={handleChange}
                   placeholder="Product Name" required/>

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={product.description} onChange={handleChange}
                      placeholder="Description" required/>

            <label htmlFor="price">Price</label>
            <input id="price" name="price" type="number" value={product.price} onChange={handleChange}
                   placeholder="Price" required/>

            <label htmlFor="stock">Stock</label>
            <input id="stock" name="stock" type="number" value={product.stock} onChange={handleChange}
                   placeholder="Stock" required/>

            <label htmlFor="category">Category</label>
            <input id="category" name="category" value={product.category} onChange={handleChange} placeholder="Category"
                   required/>

            <label htmlFor="imageUpload">Product Image</label>
            <input id="imageUpload" type="file" onChange={handleFileChange} accept="image/png, image/jpeg"/>

            {selectedFileName && <p>{selectedFileName}</p>}

            <div className="form-actions">
                <button type="submit">{initialData.id ? 'Update Product' : 'Save Product'}</button>
            </div>
        </form>
    );
};

export default ProductForm;
