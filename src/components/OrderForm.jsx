import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import '../styles/components/OrderForm.css';

const OrderForm = ({ initialData = {}, onClose }) => {
    const { updateOrder } = useOrders();
    const [order, setOrder] = useState({
        id: initialData.id || '',
        orderDate: initialData.orderDate || '',
        customerId: initialData.customerId || '',
        status: initialData.status || 'Pending',
        totalAmount: initialData.totalAmount || 0,
        isCancelled: initialData.isCancelled || false,
        shippingAddress: initialData.shippingAddress || '',
        products: initialData.products || []
    });

    // Handle input change for general order fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    // Handle change for product's isReady status
    const handleProductChange = (index) => {
        const updatedProducts = [...order.products];
        updatedProducts[index].isReady = !updatedProducts[index].isReady;
        setOrder({ ...order, products: updatedProducts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateOrder(order.id, order);
            onClose();
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="status">Order Status</label>
            <input
                id="status"
                name="status"
                value={order.status}
                onChange={handleChange}
                placeholder="Order Status"
                required
                readOnly
            />

            <label htmlFor="shippingAddress">Shipping Address</label>
            <textarea
                id="shippingAddress"
                name="shippingAddress"
                value={order.shippingAddress}
                onChange={handleChange}
                placeholder="Shipping Address"
                required
            />

            <h3>Products</h3>
            {order.products.map((product, index) => (
                <div key={product.productId} className="product-item">
                    <span>{product.productName}</span>
                    <span>x{product.quantity}</span>
                    <div className="product-checkbox-container">
                        <input
                            type="checkbox"
                            checked={product.isReady}
                            onChange={() => handleProductChange(index)}
                        />
                        <label>Ready</label>
                    </div>
                </div>
            ))}

            <div className="form-actions">
                <button type="submit">Update Order</button>
            </div>
        </form>
);
};

export default OrderForm;
