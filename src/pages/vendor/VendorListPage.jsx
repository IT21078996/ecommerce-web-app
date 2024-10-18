import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useVendors } from "../../context/VendorContext";
import VendorTable from "../../components/VendorTable";
import VendorForm from "../../components/VendorForm";
import ReviewModal from "../../components/ReviewModal.jsx";

const VendorListPage = () => {
  const { vendors, deleteVendor, updateVendor, addVendor, fetchReviewsByVendor } = useVendors();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleAddVendor = () => {
    navigate('/users'); // Navigate to the desired URL
  };

  // Handle adding a new vendor (show the form)
  // const handleAddVendor = () => {
  //   setSelectedVendor(null); // Ensure no vendor is selected
  //   setIsAddingNew(true); // Switch to add mode
  // };

  // Fetch reviews and open review modal
  const handleViewReviews = async (vendorId) => {
    const fetchedReviews = await fetchReviewsByVendor(vendorId);
    setReviews(fetchedReviews);
    setIsReviewModalOpen(true);
  };

  // Close review modal
  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviews([]);
  };

  return (
    <div className={"product-list"}>
      <div className="header">
        <h2>Vendor Management</h2>
        <button className="create-button" onClick={handleAddVendor}>Create Vendor</button>
      </div>
      <VendorTable vendors={vendors} onEdit={handleEdit} onDelete={handleDelete} onViewReviews={handleViewReviews}/>
      {selectedVendor && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Vendor Form</h3>
                <button className="close-button" onClick={handleCancelForm}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <VendorForm vendor={selectedVendor} onSubmit={handleFormSubmit} onCancel={handleCancelForm}/>
            </div>
          </div>
      )}

      {isReviewModalOpen && (
          <ReviewModal reviews={reviews} onClose={handleCloseReviewModal}/>
      )}
    </div>
  );
};

export default VendorListPage;
