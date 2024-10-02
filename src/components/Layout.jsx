import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li><Link to="/products">Product Management</Link></li>
                        <li><Link to="/users">User Management</Link></li>
                        <li><Link to="/vendors">Vendor Management</Link></li>
                        <li><Link to="/inventory">Inventory Management</Link></li>
                        <li><Link to="/orders">Order Management</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                {children} {/* Render the current section based on routing */}
            </main>
        </div>
    );
};

export default Layout;
