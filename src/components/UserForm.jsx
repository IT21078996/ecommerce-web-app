import React, { useState, useEffect } from "react";
import { useUsers } from "../context/UserContext";
import "../styles/components/UserForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserForm = ({ initialData = {}, onClose }) => {
  const { createUser, updateUser } = useUsers();
  const roles = ["Administrator", "Vendor", "CSR"];

  // State for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Initialize form state with default values, including password for editing mode
  const [user, setUser] = useState({
    id: initialData?.id || "",
    email: initialData?.email || "",
    password: initialData?.password || "", // Include password here
    username: initialData?.username || "",
    role: initialData?.role || "CSR",
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });

  // Update form state if `initialData` changes (e.g., when editing an existing user)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setUser({
        id: initialData.id || "",
        email: initialData.email || "",
        password: initialData.password || "", // Pre-fill password for editing
        username: initialData.username || "",
        role: initialData.role || "CSR",
        isActive:
          initialData.isActive !== undefined ? initialData.isActive : true,
      });
    }
  }, [initialData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.id) {
        await updateUser(user.id, user);
      } else {
        await createUser(user);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <div className="password-wrapper">
        <input
          name="password"
          type={passwordVisible ? "text" : "password"}
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <span className="toggle-password" onClick={togglePasswordVisibility}>
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <input
        name="username"
        value={user.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <label htmlFor="role">Role</label>
      <select name="role" value={user.role} onChange={handleChange} required>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      {!user.id && (
        <div>
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={user.isActive}
              onChange={() => setUser({ ...user, isActive: !user.isActive })}
              required
            />
            Active
          </label>
        </div>
      )}
      <button type="submit">{user.id ? "Update User" : "Save User"}</button>
    </form>
  );
};

export default UserForm;
