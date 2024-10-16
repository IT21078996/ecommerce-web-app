import React, { useState } from 'react';
import { FaHome, FaBoxes, FaUsers, FaClipboardList, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/components/Layout.css';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // If the user is not logged in, don't show the sidebar
    if (!user) {
        return <>{children}</>;
    }

    return (
        <div className={`layout ${isCollapsed ? 'collapsed' : ''}`}>
            <aside className="sidebar">
                <div className="collapse-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <span>{isCollapsed ? '>' : '<'}</span>
                </div>
                <div className="user-info">
                    <span className="username">{user.email.split('@')[0]}</span>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                                <FaHome /> <span>Dashboard</span>
                            </NavLink>
                        </li>

                        {(user && ['Administrator', 'Vendor', 'CSR'].includes(user.role)) && (
                            <li>
                                <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <FaBoxes /> <span>Product</span>
                                </NavLink>
                            </li>
                        )}

                        {user && user.role === 'Administrator' && (
                            <>
                                <li>
                                    <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        <FaUsers /> <span>User</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/vendors" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        <FaShop /> <span>Vendor</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/inventory" className={({ isActive }) => (isActive ? 'active' : '')}>
                                        <FaWarehouse /> <span>Inventory</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {(user && ['Administrator', 'Vendor', 'CSR'].includes(user.role)) && (
                            <li>
                                <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <FaClipboardList /> <span>Order</span>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="logout-container">
                    <button className="logout-button" onClick={handleLogout}>
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </div>
            </aside>
            <main className="main-content">{children}</main>
        </div>
    );
};

export default Layout;
