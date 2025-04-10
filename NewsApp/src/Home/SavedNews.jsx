import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import NewsCard from '../Card/NewsCard'
function SavedNews() {
  const [newsId,setNewsId]=useState([])
  const [news,setNews]=useState([])
  const token=localStorage.getItem('userToken')
  const fetchSavedNewsId=async()=>{
    try{
      let responce=await fetch('http://127.0.0.1:3000/api/saveNews',{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      responce=await responce.json()
      setNewsId(responce.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchSavedNewsId()
  },[])

  const fetchSavedNews=async()=>{
    newsId.map(async(singleNews)=>{
      let responce=await fetch('http://127.0.0.1:3000/api/news/'+singleNews.newsId)
      responce=await responce.json()
      responce.deleteId=singleNews._id
      setNews((prev)=>{
        return [...prev,responce]
      });
    })
  }
  useEffect(()=>{
    fetchSavedNews()
  },[newsId])
  return (
    <div>
      <NavBar/>
      <div className="news-content">
          <div className="card">
            {news.map((singleNews, index) => {
              return (
                <NewsCard
                  key={index}
                  id={singleNews._id}
                  title={singleNews.title}
                  description={singleNews.description}
                  image={singleNews.image}
                  delete={singleNews.deleteId}
                />
              );
            })}
          </div>
          </div>
    </div>
  )
}

export default SavedNews
