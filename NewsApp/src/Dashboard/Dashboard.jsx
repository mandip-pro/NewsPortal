// Dashboard.js
import React, { useEffect } from "react";
import './Dashboard.css';
import toast,{Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar1">
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to={'/admin/dashboard'}>Home</Link></li>
                    <li><a href="#">Profile</a></li>
                    <li><Link to='/admin/create-news'>Create-News</Link></li>
                    <li><a href="#">Setting</a></li>
                </ul>
            </nav>
        </div>
    );
};

const Header = () => {
    const navigate=useNavigate()
    const handleLogOut=async ()=>{
        try {
          let responce = await fetch("http://127.0.0.1:3000/api/auth/logout");
          responce = await responce.json();
          if (responce.state) {
            toast.success(responce.message);
            localStorage.clear()
            navigate('/')
            //navigate
          } else {
            toast.error(responce.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    return (
        <div className="header">
            <h1>Welcome to the Dashboard</h1>
            <div>
                <button onClick={handleLogOut}>Logout</button>
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
    const naavigate=useNavigate()
    useEffect(()=>{
        let token=localStorage.getItem('userToken')
        if(token){
            let user=localStorage.getItem('userInfo')
            user=JSON.parse(user)
            if(!(user.role==='admin')){
                naavigate('/')
            }
        }else{
            naavigate('/login')
        }
    },[])
    
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
            <Toaster/>
        </div>
    );
};

export default Dashboard;
