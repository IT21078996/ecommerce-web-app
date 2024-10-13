import React, {useEffect, useState} from 'react';
import {useOrders} from "../../context/OrderContext.jsx";
import OrderTable from "../../components/OrderTable.jsx";
import OrderForm from "../../components/OrderForm.jsx";

const OrderListPage = () => {
    const { orders, fetchOrders, deleteOrder } = useOrders();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const openForm = (order = null) => {
        setSelectedOrder(order); // Set the selected order for editing
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedOrder(null); // Clear the selected order
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };

    return (
        <div className={"product-list"}>
            <div className="header">
                <h2>Order Management</h2>
            </div>
            <OrderTable orders={orders} onEdit={openForm} onDelete={handleDelete} />
            {isFormOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Order Form</h3>
                            <button className="close-button" onClick={closeForm}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <OrderForm initialData={selectedOrder} onClose={closeForm}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderListPage;
