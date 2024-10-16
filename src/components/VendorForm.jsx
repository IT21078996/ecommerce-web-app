import React, { useState, useEffect } from "react";
import "../styles/components/VendorForm.css";

const VendorForm = ({ vendor, onSubmit, onCancel }) => {
  // Initial form state, populated with vendor data if editing
  const [vendorName, setVendorName] = useState(vendor?.vendorName || "");
  const [email, setEmail] = useState(vendor?.email || "");
  const [phone, setPhone] = useState(vendor?.phone || "");
  const [address, setAddress] = useState(vendor?.address || "");

  // Update form fields when editing a vendor
  useEffect(() => {
    if (vendor) {
      setVendorName(vendor.vendorName);
      setEmail(vendor.email);
      setPhone(vendor.phone);
      setAddress(vendor.address);
    }
  }, [vendor]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVendor = {
      vendorName,
      email,
      phone,
      address,
    };
    onSubmit(updatedVendor); // Call parent function to handle the form submission
  };

  return (
      <form onSubmit={handleSubmit}>
          <label>Vendor Name</label>
          <input
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

        <div className="form-actions">
          <button type="submit">
            {vendor ? "Update Vendor" : "Add Vendor"}
          </button>
        </div>
      </form>
  );
};

export default VendorForm;
