import React, {useEffect} from 'react';
import {useProducts} from "../context/ProductContext.jsx";
import '../styles/components/ProductTable.css';

const ProductTable = ({ products, onEdit, onDelete }) => {
    const { activateProduct, deactivateProduct, message, clearMessage } = useProducts();

    const handleToggle = (id, isActive) => {
        if (isActive) {
            deactivateProduct(id);
        } else {
            activateProduct(id);
        }
    };

    // Clear the notification after 5 seconds
    useEffect(() => {
        if (message) {
            clearMessage();
        }
    }, [message]);

    return (
        <div>
            {message && (
                <div className={`notification ${message.type}`}>
                    {message.text}
                </div>
            )}

            <table className="product-table">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>
                            <img
                                src={product.base64Image}
                                alt={product.productName}
                                className="product-image-small"
                            />
                        </td>
                        <td>{product.productName}</td>
                        <td>{product.description}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td className={`product-status ${product.isActive ? 'active' : 'inactive'}`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                        </td>
                        <td>{product.stock}</td>
                        <td>{product.rating}</td>
                        <td>
                            <button className="action-button edit-button" onClick={() => onEdit(product)}>
                                Edit
                            </button>
                            <button className="action-button delete-button" onClick={() => onDelete(product.id)}>
                                Delete
                            </button>
                            <button
                                className={`action-button ${product.isActive ? 'deactivate-button' : 'activate-button'}`}
                                onClick={() => handleToggle(product.id, product.isActive)}
                            >
                                {product.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
