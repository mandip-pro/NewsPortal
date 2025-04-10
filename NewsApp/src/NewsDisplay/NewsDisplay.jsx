import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";
import "./NewsDisplay.css";
import NavBar from "../Home/NavBar";
import { CiSaveDown2 } from "react-icons/ci";

function FullArticlePage() {
  const navigate=useNavigate()
  const token=localStorage.getItem('userToken')
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        let responce = await fetch("http://127.0.0.1:3000/api/news/" + id);
        responce = await responce.json();
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

  async function handleClick(){
    if(token){
      try{
      let responce = await fetch("http://127.0.0.1:3000/api/saveNews/"+id,{
        method:'post',
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      responce=await responce.json()
       if(responce.state){
        toast.success(responce.message)
        navigate('/saved')
      }else{
        toast.error(responce.message)
      }
    }catch(err){
      console.log(err)
    }
    }else{
      navigate('/login')
    }
    
  }
  const styling = {
    fontWeight: 600,
    transform: "scale(1.05)",
    textDecoration: "none",
  };
  return (
    <>
      <NavBar style={styling} />
      <div className="full-article">
        <div className="top">
          <h1>{article.title}</h1>
          <CiSaveDown2 size={25} className="save-icon" onClick={handleClick}/>
        </div>
        <p>
          <strong>Source: </strong>article.source.name
        </p>
        <img
          src={article.image}
          alt={article.title}
          className="full-article-img"
        />
        <div className="full-article-content">
          <p>{article.description}</p>
          <a
            href={"http://google.com"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on the website
          </a>
        </div>
      </div>
      <Toaster/>
    </>
  );
}

export default FullArticlePage;
