import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import '../styles/components/ProductForm.css';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
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
            <input
                name="status"
                value={order.status}
                onChange={handleChange}
                placeholder="Order Status"
                required
            />
            <textarea
                name="shippingAddress"
                value={order.shippingAddress}
                onChange={handleChange}
                placeholder="Shipping Address"
                required
            />
            <button type="submit">Update Order</button>
        </form>
    );
};

export default OrderForm;
