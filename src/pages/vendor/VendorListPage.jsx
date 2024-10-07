import React, { useState } from "react";
import { useVendors } from "../../context/VendorContext";
import VendorTable from "../../components/VendorTable";
import VendorForm from "../../components/VendorForm";

const VendorListPage = () => {
  const { vendors, deleteVendor, updateVendor, addVendor } = useVendors();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Handle when a user clicks "Edit" on a vendor
  const handleEdit = (vendorId) => {
    const vendorToEdit = vendors.find((v) => v.id === vendorId); // Find the vendor by ID
    setSelectedVendor(vendorToEdit); // Set the selected vendor for editing
    setIsAddingNew(false); // Ensure we're in edit mode, not add mode
  };

  // Handle delete vendor with confirmation
  const handleDelete = async (vendorId) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      await deleteVendor(vendorId);
      alert("Vendor deleted successfully");
    }
  };

  // Handle form submission for both adding and editing vendors
  const handleFormSubmit = async (vendorData) => {
    if (selectedVendor) {
      // Update vendor if editing
      await updateVendor(selectedVendor.id, vendorData);
      alert("Vendor updated successfully");
    } else {
      // Add new vendor if adding
      await addVendor(vendorData);
      alert("Vendor added successfully");
    }
    setSelectedVendor(null); // Clear the selection
    setIsAddingNew(false); // Exit form mode
  };

  // Handle form cancellation for both add and edit
  const handleCancelForm = () => {
    setSelectedVendor(null); // Clear any selected vendor
    setIsAddingNew(false); // Exit form mode
  };

  // Handle adding a new vendor (show the form)
  const handleAddVendor = () => {
    setSelectedVendor(null); // Ensure no vendor is selected
    setIsAddingNew(true); // Switch to add mode
  };

  return (
    <div className="vendor-list-page">
      <h2>Vendor Management</h2>

      {selectedVendor || isAddingNew ? (
        // Show VendorForm for both add and edit scenarios
        <VendorForm
          vendor={selectedVendor}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
        />
      ) : (
        <>
          <button className="add-vendor-btn" onClick={handleAddVendor}>
            Add Vendor
          </button>

          <VendorTable
            vendors={vendors}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default VendorListPage;
