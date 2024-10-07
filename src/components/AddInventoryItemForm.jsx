import React, { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import { useNavigate } from "react-router-dom";
import "../styles/components/AddInventoryItemForm.css";

const AddInventoryItemForm = () => {
  const { addInventoryItem, products, inventoryItems } = useInventory(); // Get inventoryItems and products
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [lastRestockDate, setLastRestockDate] = useState("");

  // Filter out products that are already in inventory
  const availableProducts = products.filter(
    (product) => !inventoryItems.some((item) => item.productId === product.id)
  );

  // Find the vendorId of the selected product
  const getVendorIdForSelectedProduct = () => {
    const product = products.find((product) => product.id === selectedProduct);
    return product ? product.vendorId : null; // Return the vendorId if the product exists
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct || quantity <= 0 || !lastRestockDate) {
      alert("Please fill in all fields.");
      return;
    }

    const vendorId = getVendorIdForSelectedProduct();
    if (!vendorId) {
      alert("Vendor ID is missing for the selected product.");
      return;
    }

    const newItem = {
      productId: selectedProduct, // Product ID from selection
      quantity: parseInt(quantity), // Ensure it's an integer
      lastRestockDate, // Ensure correct format for the backend
      vendorId, // Retrieved from the selected product
      restockQuantity: 0, // Default value for now
      isLowStock: quantity < 5, // Example logic to set isLowStock
    };

    console.log("Sending new item to server:", newItem);

    try {
      await addInventoryItem(newItem); // Make API call to add item
      alert("Item added successfully.");
      navigate("/inventory"); // Navigate back to inventory list after success
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item.");
    }
  };

  return (
    <div className="add-inventory-form">
      <h2>Add New Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product">Product</label>
          <select
            id="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Select a product
            </option>
            {availableProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="restockDate">Last Restock Date</label>
          <input
            type="date"
            id="restockDate"
            value={lastRestockDate}
            onChange={(e) => setLastRestockDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Item</button>
        <button type="button" onClick={() => navigate("/inventory")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddInventoryItemForm;
