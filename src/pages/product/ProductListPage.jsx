import React, {useEffect, useState} from 'react';
import {useLoading} from "../../context/Loading.jsx";
import { useProducts } from '../../context/ProductContext.jsx';
import ProductTable from '../../components/ProductTable.jsx';
import ProductForm from "../../components/ProductForm.jsx";
import Spinner from "../../components/Spinner.jsx";
import '../../styles/pages/ProductListPage.css';

const ProductListPage = () => {
    const { products, fetchVendorProducts, deleteProduct } = useProducts();
    const { loading, startLoading, stopLoading } = useLoading();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                startLoading();
                await fetchVendorProducts();
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                stopLoading();
            }
        };

        loadProducts();
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
            {loading ? <Spinner /> : <ProductTable products={products} onEdit={openForm} onDelete={handleDelete} />}
            {isFormOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Product Form</h3>
                            <button className="close-button" onClick={closeForm}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ProductForm initialData={selectedProduct} onClose={closeForm}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
