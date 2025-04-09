import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast ,{Toaster} from 'react-hot-toast'

function NavBar(props) {
  
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  useEffect(()=>{
    const token=localStorage.getItem('userToken')

    if(token){
      setIsLoggedIn(!isLoggedIn)
      console.log(isLoggedIn);
      
    }else{
      setIsLoggedIn(isLoggedIn)
      console.log(isLoggedIn);
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleLogOut=async ()=>{
    try {
      let responce = await fetch("http://127.0.0.1:3000/api/auth/logout");
      responce = await responce.json();
      if (responce.state) {
        toast.success(responce.message);
        setIsLoggedIn(!isLoggedIn)
        console.log(isLoggedIn);
        
        localStorage.clear()
        //navigate
      } else {
        toast.error(responce.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          NewsApp
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <label style={props?props.style:''}>Content</label>
          <div>

          </div>
        </div>
      {
        isLoggedIn?<button onClick={handleLogOut}>LogOut</button>:<Link to='/Login'><button>Login</button></Link>
      }
            </div>
      <Toaster/>
    </nav>
  );
}

export default NavBar
