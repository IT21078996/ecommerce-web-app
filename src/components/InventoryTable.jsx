import React from "react";

const InventoryTable = ({ inventoryItems, onRestock, onDelete }) => {
  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Quantity</th>
          <th>Last Restock Date</th>
          <th>Restock Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventoryItems.map((item) => (
          <tr key={item.id}>
            <td>{item.productId}</td>
            <td>{item.quantity}</td>
            <td>{new Date(item.lastRestockDate).toLocaleDateString()}</td>
            <td>
              <input
                type="number"
                defaultValue={0}
                onBlur={(e) => {
                  const restockQuantity = parseInt(e.target.value, 10);
                  if (restockQuantity > 0) {
                    onRestock(item.id, restockQuantity);
                  }
                }}
              />
            </td>
            <td>
              <button
                className="restock-btn"
                onClick={() => onRestock(item.id)} // Example: restock by 1 unit
              >
                Restock
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(item.id, item.productId)} // Trigger delete handler
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
