import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../context/NotificationContext";

const NotificationDropdown = ({
  vendorId,
  showVendorNotifications = false,
}) => {
  const {
    notifications,
    fetchVendorNotifications,
    fetchAllNotifications, // Fetch all notifications
    markNotificationAsRead,
  } = useNotifications();

  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch either vendor-specific or all notifications based on a condition
  useEffect(() => {
    if (showVendorNotifications && vendorId) {
      fetchVendorNotifications(vendorId);
    } else {
      fetchAllNotifications();
    }
  }, [
    vendorId,
    showVendorNotifications,
    fetchAllNotifications,
    fetchVendorNotifications,
  ]);

  return (
    <div className="notification-container">
      <FaBell onClick={() => setShowDropdown(!showDropdown)} />
      {notifications.length > 0 && (
        <span className="notification-count">{notifications.length}</span>
      )}

      {showDropdown && (
        <div className="notification-dropdown">
          <h4>Notifications</h4>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={notification.isRead ? "read" : "unread"}
                  onClick={() => markNotificationAsRead(notification.id)} // Mark as read when clicked
                >
                  <p>{notification.message}</p>
                </li>
              ))
            ) : (
              <li>No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
