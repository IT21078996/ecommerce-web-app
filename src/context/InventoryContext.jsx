import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch all inventory items
  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Inventory`);
      setInventoryItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Inventory/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add new inventory item
  const addInventoryItem = async (newItem) => {
    try {
      const response = await axios.post(`${baseUrl}/Inventory`, newItem);
      setInventoryItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error("Error adding inventory item:", error);
      throw error; // To make sure the error gets logged in the form
    }
  };

  // Get inventory by ID
  const fetchInventoryById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/Inventory/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory by ID:", error);
      throw error;
    }
  };

  // Inside your InventoryContext.js
  const deleteInventoryItem = async (id, productId) => {
    try {
      // Step 1: Check for pending orders related to the product
      const pendingOrderResponse = await axios.get(
        `${baseUrl}/Order/pendingOrders/${productId}`
      );

      if (pendingOrderResponse.data) {
        // If there are pending orders, prevent deletion and notify the user
        alert(
          "Cannot delete this inventory item as there are pending orders related to it."
        );
        return;
      }

      // Step 2: Proceed with deletion if no pending orders
      await axios.delete(`${baseUrl}/Inventory/${id}`);
      setInventoryItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );

      alert("Inventory item deleted successfully.");
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("An error occurred while deleting the inventory item.");
    }
  };

  // Update inventory item
  const updateInventoryItem = async (id, updatedItem) => {
    try {
      const response = await axios.put(
        `${baseUrl}/Inventory/${id}`,
        updatedItem
      );
      setInventoryItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      console.error("Error updating inventory item:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchProducts();
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        inventoryItems,
        products,
        addInventoryItem,
        fetchInventoryById,
        updateInventoryItem,
        deleteInventoryItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
