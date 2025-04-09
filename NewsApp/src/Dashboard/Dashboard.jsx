// Dashboard.js
import React from "react";
import './Dashboard.css';

const Sidebar = () => {
    return (
        <div className="sidebar1">
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Analytics</a></li>
                    <li><a href="#">Settings</a></li>
                </ul>
            </nav>
        </div>
    );
};

const Header = () => {
    return (
        <div className="header">
            <h1>Welcome to the Dashboard</h1>
            <div>
                <button>Logout</button>
            </div>
        </div>
    );
};

const Card = ({ title, content }) => {
    return (
        <div className="card1">
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content-area1">
                <Header />
                <div>
                    <Card title="All News" content="adsadsdsa zdfsf" />
                    <div className="content-child1">
                        <Card title="Users" content="12" />
                        <Card title="Revenue" content="$8,000" />
                        <Card title="Revenue" content="$8,000" />
                        <Card title="Revenue" content="$8,000" />
                        <Card title="Revenue" content="$8,000" />
                        <Card title="Revenue" content="$8,000" />
                        <Card title="Revenue" content="$8,000" />


                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
