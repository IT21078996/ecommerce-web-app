import React, { useEffect, useState } from "react";
import { useUsers } from "../../context/UserContext";
import UserTable from "../../components/UserTable";
import UserForm from "../../components/UserForm";
import "../../styles/pages/UserListPage.css";

const UserListPage = () => {
  const { users, fetchUsers, updateUser, deleteUser } = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter active users on the frontend
  const activeUsers = users.filter((user) => user.isActive);

  // Function to open the form modal
  const openForm = (user = null) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  // Function to close the form modal
  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  // Function to delete a user (mark as inactive)
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Function to toggle user status (active/inactive)
  const handleToggleStatus = async (userId, newStatus) => {
    try {
      const userToUpdate = users.find((user) => user.id === userId);
      if (userToUpdate) {
        await updateUser(userId, { ...userToUpdate, isActive: newStatus });
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  return (
    <div className="user-list">
      <div className="header">
        <h2>User Management</h2>
        <button className="create-button" onClick={() => openForm()}>
          Create User
        </button>
      </div>

      {/* Pass the filtered active users to UserTable */}
      <UserTable
        users={activeUsers}
        onEdit={openForm}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* Modal for creating or editing users */}
      {isFormOpen && (
        <div
          className="modal"
          style={{
            zIndex: 1000,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
          }}
        >
          <div className="modal-content">
            <UserForm initialData={selectedUser} onClose={closeForm} />
            <button className="close-button" onClick={closeForm}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
