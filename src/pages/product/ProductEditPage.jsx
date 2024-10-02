import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext.jsx';
import ProductForm from '../../components/ProductForm.jsx';

const ProductEditPage = () => {
    const { id } = useParams();
    const { products, fetchProductById, updateProduct } = useProducts();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchedProduct = fetchProductById(id);
            setProduct(fetchedProduct);
        }
    }, [id]);

    const handleSave = (updatedProduct) => {
        updateProduct(id, updatedProduct);
    };

    return (
        <div>
            <h2>Edit Product</h2>
            {product ? (
                <ProductForm initialData={product} onSave={handleSave} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductEditPage;
