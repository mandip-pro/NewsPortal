import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import './Home.css'
import Sidebar from './Sidebar'
import NewsCard from '../Card/NewsCard'
function Home() {
  const token=localStorage.getItem('userToken')
  
  const navigate=useNavigate()
  const[news,setNews]=useState([])
  const [selectedCategory, setSelectedCategory] = useState('trending');
  console.log(selectedCategory)
  const fetchNews=async()=>{
    try{
      let responce=await fetch('http://127.0.0.1:3000/api/news')
      responce=await responce.json()
      setNews(responce.data)      
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(token){
      fetchNews()
    }else{
      navigate('/login')
    }
    
  },[])
  function setCategory(a){
    setSelectedCategory(a)
  }
  return (
    <div className="homepage">
      <NavBar />
      <div className="main-content">
        <Sidebar setSelectedCategory={setCategory} />
        <div className="news-content">
          <h2>{selectedCategory ? `News - ${selectedCategory}` : 'Welcome to NewsApp'}</h2>
          {/* Here you can display the news content dynamically */}
          <div className="card">
            {
                news.map((singleNews,index)=>{
                  return(
                    <NewsCard key={index} id={singleNews._id} title={singleNews.title} description={singleNews.description} image={singleNews.image} />
                  )
                })
          }
          </div>
          
          {selectedCategory && (
            <div className="category-content">
              <p>Displaying news for the "{selectedCategory}" category...</p>
              {/* Fetch and display news based on category */}
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home
