import React from "react";
import { FaEdit } from "react-icons/fa";
import ".././styles/components/UserTable.css";

const UserTable = ({ users, onEdit, onToggleStatus }) => {
  return (
    <table>
      <thead>
      <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
          <th></th>
      </tr>
      </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>
              {/* Display user status (either Active or Inactive) */}
              <span
                className={`status-label ${
                  user.isActive ? "active" : "inactive"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </td>
            <td>
              {/* Toggle Active/Inactive in the Actions column */}
              <button
                className={`${
                  user.isActive ? "active" : "inactive"
                }`}
                onClick={() => onToggleStatus(user.id, !user.isActive)}
              >
                {user.isActive ? "Inactive" : "Set Active"}
              </button>
            </td>
            <td>
              <button className="edit-button" onClick={() => onEdit(user)}>
                <FaEdit/>
              </button>
            </td>
          </tr>
        ))}
        </tbody>
    </table>
  );
};

export default UserTable;
