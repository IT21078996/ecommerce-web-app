import React, { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_BASE_URL;

const OrderTable = ({ orders, onEdit, onDelete }) => {
    const [usernames, setUsernames] = useState({});

    // Fetch users and map customerId to username
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${baseUrl}/User`);
            const users = await response.json();
            const usernameMap = {};
            users.forEach(user => {
                usernameMap[user.id] = user.username;
            });
            setUsernames(usernameMap);
        };

        fetchUsers();
    }, []);

    return (
        <table className="product-table">
            <thead>
            <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                <tr key={order.id}>
                    <td>#{order.id.substring(0, 5)}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{usernames[order.customerId] || ''}</td>
                    <td>{order.products ? order.products.length : 0}</td>
                    <td>Rs.{order.totalAmount.toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>
                        <button className="action-button edit-button" onClick={() => onEdit(order)}>Edit</button>
                        <button className="action-button delete-button" onClick={() => onDelete(order.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default OrderTable;
