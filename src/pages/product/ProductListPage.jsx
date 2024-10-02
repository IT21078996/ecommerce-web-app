import React, {useEffect, useState} from 'react';
import { useProducts } from '../../context/ProductContext.jsx';
import ProductTable from '../../components/ProductTable.jsx';
import ProductForm from "../../components/ProductForm.jsx";
import '../../styles/pages/ProductListPage.css';

const ProductListPage = () => {
    const { products, fetchProducts, deleteProduct } = useProducts();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const openForm = (product = null) => {
        setSelectedProduct(product); // Set the selected product for editing
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedProduct(null); // Clear the selected product
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    return (
        <div className={"product-list"}>
            <div className="header">
                <h2>Product Management</h2>
                <button className="create-button" onClick={openForm}>Create Product</button>
            </div>
            <ProductTable products={products} onEdit={openForm} onDelete={handleDelete} />
            {isFormOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <ProductForm initialData={selectedProduct} onClose={closeForm} />
                        <button className="close-button" onClick={closeForm}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
