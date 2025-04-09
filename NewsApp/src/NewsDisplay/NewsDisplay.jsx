import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDisplay.css'
import NavBar from '../Home/NavBar';
function FullArticlePage() {
    const {id}=useParams()
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        let responce=await fetch("http://127.0.0.1:3000/api/news/"+id)
      responce=await responce.json()
      console.log(responce)
        setArticle(responce);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const styling={
    fontWeight: 600,
    transform: "scale(1.05)",
    textDecoration: "none"
  }
  return (
    <>
    <NavBar style={styling}/>
    <div className="full-article">
      <h1>{article.title}</h1>
      <p><strong>Source: </strong>article.source.name</p>
      <img src={article.image} alt={article.title} className="full-article-img" />
      <div className="full-article-content">
        <p>{article.description}</p>
        <a href={'http://google.com'} target="_blank" rel="noopener noreferrer">Read more on the website</a>
      </div>
    </div>
    </>
  );
}

export default FullArticlePage;
