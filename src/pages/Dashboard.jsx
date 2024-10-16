import React from 'react';
import '../styles/pages/Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-container">
            {/* Metrics Section */}
            <div className="metrics">
                <div className="metric-box">
                    <h3>Total Orders</h3>
                    <p>1,240</p>
                </div>
                <div className="metric-box">
                    <h3>Pending Orders</h3>
                    <p>48</p>
                </div>
                <div className="metric-box">
                    <h3>Active Products</h3>
                    <p>540</p>
                </div>
                <div className="metric-box">
                    <h3>Low Stock Alerts</h3>
                    <p>12</p>
                </div>
                <div className="metric-box">
                    <h3>Active Vendors</h3>
                    <p>8</p>
                </div>
            </div>

            {/* Orders Overview Section */}
            <div className="orders-overview">
                <h2>Recent Orders</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>#12345</td>
                        <td>John Doe</td>
                        <td>Pending</td>
                        <td>$150.00</td>
                        <td><button>View</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* Product Performance Section */}
            <div className="product-performance">
                <h2>Top Products</h2>
                <div className="chart">
                    {/* Chart for display performance */}
                </div>
            </div>

            {/* Vendor Performance Section */}
            <div className="vendor-performance">
                <h2>Vendor Performance</h2>
                <div className="chart">
                    {/* Chart for vendor performance */}
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="recent-activity">
                <h2>Recent Activity</h2>
                <ul>
                    <li>Order #12345 placed by John Doe</li>
                    <li>Product ABC updated by Vendor X</li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
