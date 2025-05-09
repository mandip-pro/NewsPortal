import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Sidebar(props) {
  const navigate=useNavigate()
  const [categories, setCategories] = useState(["Trending"]);
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [click,setClick]=useState(false)
  
  const token=localStorage.getItem('userToken')
  let name=''
  if (token){
    let user=localStorage.getItem('userInfo')
    user=JSON.parse(user)
    name=user.name
  
  }
  
  async function fetchCategory() {
    try {
      let res = await fetch(`http://127.0.0.1:3000/api/category/`);
      res = await res.json();
      let data = res.data;
      data.forEach((datum) => {
        setCategories((prev) => {
          return [...prev, datum.name];
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleToggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? activeCategory : category);
  };
  props.setSelectedCategory(activeCategory);
  
  const handleClicked=async(e)=>{
    e.preventDefault()
    setClick(!click)
    if(token){
      navigate('/saved')
    }else{
      navigate('/login')
    }
    
  }
  return (
    <div className="sidebar">
      <div>
        <h3>Categories</h3>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => handleToggleCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      </div>
      
      <div className="sidebar-bottom">
        <div className={click?'collection active':"collection"} onClick={handleClicked} >
       <p>My News</p> 
      </div>
      <div className="collection1" style={{display: token ?'inline':'none'}}>{name}</div>
      </div>
      
    </div>
  );
}

export default Sidebar;
