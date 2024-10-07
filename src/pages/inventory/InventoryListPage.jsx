import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useInventory } from "../../context/InventoryContext";
import InventoryTable from "../../components/InventoryTable";
import "../../styles/pages/InventoryListPage.css";

const baseUrl = import.meta.env.VITE_BASE_URL;

const InventoryListPage = () => {
  const {
    inventoryItems = [],
    fetchInventoryById,
    updateInventoryItem,
    deleteInventoryItem, // Make sure to include deleteInventoryItem
  } = useInventory(); // Ensure destructuring correctly
  const [lowStockItems, setLowStockItems] = useState([]);
  const navigate = useNavigate();

  // Filter low stock items
  useEffect(() => {
    const lowStockThreshold = 5;
    const lowStock = inventoryItems.filter(
      (item) => item.quantity < lowStockThreshold
    );
    setLowStockItems(lowStock);
  }, [inventoryItems]);

  // Handle Restocking
  const handleRestock = async (id, restockQuantity) => {
    if (restockQuantity <= 0) {
      alert("Please enter a valid restock amount.");
      return;
    }

    try {
      const inventoryItem = await fetchInventoryById(id);
      const updatedItem = {
        ...inventoryItem,
        quantity: inventoryItem.quantity + restockQuantity,
        lastRestockDate: new Date().toISOString(),
      };

      await updateInventoryItem(id, updatedItem);
      alert(
        `Successfully restocked ${restockQuantity} units for product ${inventoryItem.productId}`
      );
    } catch (error) {
      console.error("Error during restocking:", error);
      alert("Error restocking the item.");
    }
  };

  // Handle Delete
  const handleDelete = async (inventoryId, productId) => {
    try {
      // First, check if there are any pending orders for this product
      const hasPendingOrders = await axios.get(
        `${baseUrl}/Order/pendingOrders/${productId}`
      );

      if (hasPendingOrders.data) {
        alert(
          "Cannot delete this item. There are pending orders for this product."
        );
      } else {
        // If no pending orders, proceed to delete the inventory item
        await deleteInventoryItem(inventoryId, productId); // Pass both inventoryId and productId
        alert("Item deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Error deleting item.");
    }
  };

  return (
    <div className="inventory-page">
      <h2>Inventory Management</h2>

      {/* Add New Item Button */}
      <button
        className="add-item-btn"
        onClick={() => navigate("/inventory/add")}
      >
        Add New Item
      </button>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="low-stock-alert">
          <h3>Low Stock Alerts</h3>
          {lowStockItems.map((item) => (
            <div key={item.id} className="alert-item">
              <p>
                Product ID: {item.productId} is low on stock (Quantity:{" "}
                {item.quantity}). Please restock.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Inventory Table */}
      <InventoryTable
        inventoryItems={inventoryItems}
        onRestock={handleRestock}
        onDelete={handleDelete} // Pass the delete handler to InventoryTable
      />
    </div>
  );
};

export default InventoryListPage;
