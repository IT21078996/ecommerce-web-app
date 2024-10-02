import React from 'react';
import '../styles/components/ProductTable.css';

const ProductTable = ({ products, onEdit, onDelete, onToggle }) => {
    return (
        <table className="product-table">
            <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
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
                    <td><img src={product.imageUrl} alt={product.productName} className="product-image-small" /></td>
                    <td>{product.productName}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={`product-status ${product.isActive ? 'active' : 'inactive'}`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                    </td>
                    <td>{product.stock}</td>
                    <td>{product.rating}</td>
                    <td>
                        <button className="action-button edit-button" onClick={() => onEdit(product)}>Edit</button>
                        <button className="action-button delete-button" onClick={() => onDelete(product.id)}>Delete
                        </button>
                        <button
                            className={`action-button ${product.isActive ? 'deactivate-button' : 'activate-button'}`}
                            onClick={() => onToggle(product.id, product.isActive)}>
                            {product.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
