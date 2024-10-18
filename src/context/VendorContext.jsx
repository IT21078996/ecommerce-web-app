import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);
  const [reviews, setReviews] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL; // Replace with actual base URL

  // Fetch all vendors
  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Vendor`);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  // Fetch reviews for a specific vendor
  const fetchReviewsByVendor = async (vendorId) => {
    try {
      const response = await axios.get(`${baseUrl}/Review/vendor/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  };

  // Add new vendor
  const addVendor = async (newVendor) => {
    try {
      const response = await axios.post(`${baseUrl}/Vendor`, newVendor);
      setVendors((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  // Update vendor
  const updateVendor = async (vendorId, updatedVendor) => {
    try {
      const response = await axios.put(`${baseUrl}/Vendor/${vendorId}`, updatedVendor);
      setVendors((prev) =>
        prev.map((vendor) => (vendor.id === vendorId ? response.data : vendor))
      );
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  // Delete vendor
  const deleteVendor = async (vendorId) => {
    try {
      await axios.delete(`${baseUrl}/Vendor/${vendorId}`);
      setVendors((prev) => prev.filter((vendor) => vendor.id !== vendorId));
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <VendorContext.Provider
      value={{
        vendors,
        reviews,
        addVendor,
        updateVendor,
        deleteVendor,
        fetchReviewsByVendor,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export const useVendors = () => useContext(VendorContext);
