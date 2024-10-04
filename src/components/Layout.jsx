import React from 'react';
import { FaHome, FaBoxes, FaUsers, FaClipboardList, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import { FaShop } from "react-icons/fa6";
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";
import '../styles/components/Layout.css';

const Layout = ({ children }) => {
    const { user, logout } = useAuth(); // Get the current user and their role
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="layout">
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <Link to="/"><FaHome/> <span>Dashboard</span></Link>
                        </li>

                        {(user && ['Administrator', 'Vendor', 'CSR'].includes(user.role)) && (
                            <li><Link to="/products"><FaBoxes/> <span>Product Management</span></Link></li>
                        )}

                        {user && user.role === 'Administrator' && (
                            <>
                                <li><Link to="/users"><FaUsers/> <span>User Management</span></Link></li>
                                <li><Link to="/vendors"><FaShop/> <span>Vendor Management</span></Link></li>
                                <li><Link to="/inventory"><FaWarehouse/> <span>Inventory Management</span></Link></li>
                            </>
                        )}

                        {(user && ['Administrator', 'Vendor', 'CSR'].includes(user.role)) && (
                            <li><Link to="/orders"><FaClipboardList/> <span>Order Management</span></Link></li>
                        )}
                    </ul>
                </nav>
                <div className="logout-container">
                    <button className="logout-button" onClick={handleLogout}><FaSignOutAlt/> Logout</button>
                </div>
            </aside>
            <main className="main-content">
                {children} {/* Render the current section based on routing */}
            </main>
        </div>
    );
};

export default Layout;
