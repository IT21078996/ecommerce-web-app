import React, { useEffect, useState } from 'react';
import axios from "axios";
import {FaEdit, FaTrash} from "react-icons/fa";
import {useAuth} from "../context/AuthContext.jsx";
import '../styles/components/OrderTable.css'

const baseUrl = import.meta.env.VITE_BASE_URL;

const ORDER_STATUSES = [
    'Pending',             // 0
    'Processing',          // 1
    'Ready for Shipment',  // 2
    'Order Dispatched',    // 3
    'Delivered',           // 4
    'Cancelled',           // 5
];

const getDynamicOrderStatus = (order) => {
    if (order.status !== 1) {
        return ORDER_STATUSES[order.status];
    }

    const uniqueVendors = new Set(order.products.map(product => product.vendorId));
    const hasMultipleVendors = uniqueVendors.size > 1;

    const someReady = order.products.some(product => product.isReady);

    if (hasMultipleVendors && someReady) {
        return "Partially Ready";
    } else {
        return ORDER_STATUSES[order.status];
    }
};

const OrderTable = ({ orders, onEdit, onDelete }) => {
    const { user } = useAuth();
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

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.patch(`${baseUrl}/Order/${orderId}/status`, { status: newStatus });
            window.location.reload();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleCancelOrder = async (orderId) => {
        const cancellationNote = prompt('Enter a cancellation note:');
        if (cancellationNote) {
            try {
                await axios.patch(`${baseUrl}/Order/${orderId}/cancel`, { cancellationNote });
                window.location.reload();
            } catch (error) {
                console.error('Error cancelling order:', error);
            }
        }
    };

    const getStatusLabelClass = (status, dynamicStatus) => {
        if (dynamicStatus === 'Partially Ready') {
            return 'label label-partially-ready';
        }

        switch (status) {
            case 0:
                return 'label label-pending';
            case 1:
                return 'label label-processing';
            case 2:
                return 'label label-ready';
            case 3:
                return 'label label-dispatched';
            case 4:
                return 'label label-delivered';
            case 5:
                return 'label label-cancelled';
            default:
                return 'label label-partially-ready';
        }
    };

    const renderVendorActions = (order) => {
        if (user.role === 'Vendor') {
            switch (order.status) {
                case 0: // Pending
                    return <button onClick={() => handleStatusChange(order.id, 1)}>Accept Order</button>;
                case 1: // Processing
                    return <button onClick={() => handleStatusChange(order.id, 2)}>Mark as Ready</button>;
                case 2: // Ready for Shipment
                    return <button onClick={() => handleStatusChange(order.id, 3)}>Dispatch Order</button>;
                case 3: // Order Dispatched
                    return <button onClick={() => handleStatusChange(order.id, 4)}>Mark as Delivered</button>;
                default:
                    return null;
            }
        }
        return null;
    };

    const renderCsrAdminActions = (order) => {
        if (user.role === 'CSR' || user.role === 'Administrator') {
            if (order.status === 3) {
                return <button onClick={() => handleStatusChange(order.id, 4)}>Mark as Delivered</button>;
            }
            if (order.status !== 5) {
                return <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>;
            }
        }
        return null;
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
                <th></th>
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
                    <td>
                        <span className={getStatusLabelClass(order.status, getDynamicOrderStatus(order))}>
                            {getDynamicOrderStatus(order)}
                        </span>
                    </td>
                    <td>
                        {renderVendorActions(order)}
                        {renderCsrAdminActions(order)}
                    </td>
                    <td>
                        <div className="button-container">
                            <button className="edit-button" onClick={() => onEdit(order)}>
                                <FaEdit/>
                            </button>
                            <button className="delete-button" onClick={() => onDelete(order.id)}>
                                <FaTrash/>
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default OrderTable;
