import React from "react";
import "../styles/pages/VendorListPage.css";

const VendorTable = ({ vendors, onDelete, onEdit, onAddVendor }) => {
  return (
    <div className="vendor-management-container">
      <div className="vendor-header">
        <h2>Vendor Management</h2>
      </div>
      <div className="vendor-table-container">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Rating</th>
              <th>Review Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.vendorName}</td>
                <td>{vendor.email}</td>
                <td>{vendor.phone}</td>
                <td>{vendor.rating}</td>
                <td>{vendor.reviewCount}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(vendor.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(vendor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorTable;
