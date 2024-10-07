import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch vendor notifications
  const fetchVendorNotifications = async (vendorId) => {
    try {
      const response = await axios.get(`${baseUrl}/Notification/${vendorId}`);
      console.log("Notifications fetched:", response.data);
      setNotifications(response.data || []); // Ensure notifications are set as an array
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Fetch all notifications (new method)
  const fetchAllNotifications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Notification`);
      console.log("All Notifications fetched:", response.data);
      setNotifications(response.data || []); // Ensure notifications are set as an array
    } catch (error) {
      console.error("Error fetching all notifications:", error);
    }
  };


  // Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.put(
        `${baseUrl}/api/Notification/markAsRead/${notificationId}`
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        fetchVendorNotifications,
        markNotificationAsRead,
        fetchAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
