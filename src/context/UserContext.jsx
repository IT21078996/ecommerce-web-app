import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/User`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/api/User/${id}`); // Correct API endpoint
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  // Create new user
  const createUser = async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/User`, userData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  // Update user
  const updateUser = async (id, updatedData) => {
    try {
      const response = await axios.put(`${baseUrl}/User/${id}`, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? response.data : user))
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };
  // Mark user as inactive
  const deleteUser = async (id) => {
    try {
      await axios.put(`${baseUrl}/User/approve/${id}`, { isActive: false });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        fetchUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
