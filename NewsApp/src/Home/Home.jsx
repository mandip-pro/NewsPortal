import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "./Home.css";
import Sidebar from "./Sidebar";
import NewsCard from "../Card/NewsCard";
function Home() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [categoryId, setCategoryId] = useState("");
  const fetchNews = async () => {
    try {
      let responce = await fetch("http://127.0.0.1:3000/api/news");
      responce = await responce.json();
      if (categoryId) {
        let data = responce.data;
        const filteredData = [];
        data.forEach((datum) => {
          if (datum.categoryId === categoryId) {
            filteredData.push(datum);
          }
        });
        setNews(filteredData);
      } else {
        setNews(responce.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [categoryId]);
  function setCategory(a) {
    setSelectedCategory(a);
  }

  const fetchCategory = async () => {
    try {
      let res = await fetch(`http://127.0.0.1:3000/api/category/`);
      res = await res.json();
      const data = res.data;
      data.forEach((datum) => {
        if (datum.name === selectedCategory) {
          setCategoryId(datum._id); 
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, [selectedCategory]);

  return (
    <div className="homepage">
      <NavBar />
      <div className="main-content">
        <Sidebar setSelectedCategory={setCategory} />
        <div className="news-content">
          <h2>
            {selectedCategory
              ? `News - ${selectedCategory}`
              : "Welcome to NewsApp"}
          </h2>
          {/* Here you can display the news content dynamically */}
          <div className="card">
            {news.map((singleNews, index) => {
              return (
                <NewsCard
                  key={index}
                  id={singleNews._id}
                  title={singleNews.title}
                  description={singleNews.description}
                  image={singleNews.image}
                />
              );
            })}
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

export default Home;
