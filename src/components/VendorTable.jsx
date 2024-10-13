import React from "react";
import "../styles/pages/VendorListPage.css";
import {FaEdit, FaTrash} from "react-icons/fa";

const VendorTable = ({ vendors, onDelete, onEdit, onAddVendor }) => {
  return (
    <table className="product-table">
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
                <td>
                    <div className="button-container">
                        <button className="edit-button" onClick={() => onEdit(vendor.id)}>
                            <FaEdit/>
                        </button>
                        <button className="delete-button" onClick={() => onDelete(vendor.id)}>
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

export default VendorTable;
