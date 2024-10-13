import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import {useAuth} from "./AuthContext.jsx";

const baseUrl = import.meta.env.VITE_BASE_URL;
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const {user} = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch orders based on role
    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            let response;

            if (user.role === 'Vendor') {
                response = await axios.get(`${baseUrl}/Order/vendor/${user.id}`);
            } else if (user.role === 'Administrator' || user.role === 'CSR') {
                response = await axios.get(`${baseUrl}/Order`);
            } else {
                throw new Error('Unauthorized role');
            }

            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    // Create new order
    const createOrder = async (orderData) => {
        try {
            const response = await axios.post(`${baseUrl}/Order`, orderData);
            setOrders((prevOrders) => [...prevOrders, response.data]); // Add new order to state
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    // Update an existing order
    const updateOrder = async (id, updatedData) => {
        try {
            const response = await axios.put(`${baseUrl}/Order/${id}`, updatedData);

            if (response.status === 200) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === id ? response.data : order
                    )
                );
            } else {
                console.error('Error: Order update failed');
            }

            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    };

    // Delete a order by ID
    const deleteOrder = async (id) => {
        try {
            await axios.delete(`${baseUrl}/Order/${id}`);
            setOrders((prevOrders) => prevOrders.filter(order => order.id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    };

    return (
        <OrderContext.Provider value={{ orders, fetchOrders, createOrder, updateOrder, deleteOrder, loading, error }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => useContext(OrderContext);
