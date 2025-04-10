import React from 'react';
import './NewsCard.css'; // Assuming you'll create a CSS file for styling
import { Link } from 'react-router-dom';

function NewsCard(props){
    async function handleDelete(e,a){
        e.preventDefault()
        try{
            let responce=await fetch('http://127.0.0.1:3000/api/saveNews/'+a,{
                method:'delete'
            })
            responce=await responce.json()
            console.log(responce)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="news-card">
            <img src={props.image} alt={"loading..."} className="news-card-image" />
            <div className="news-card-content">
                <h3 className="news-card-title">{props.title}</h3>
                <p className="news-card-description">{props.description}</p>
                {/* <Link to={`/Content/${props.id}`} target="_blank" rel="noopener noreferrer" className="news-card-link">Read More</Link> */}
                <div className='function'> 
                    <Link to={`/Content/${props.id}`} className="news-card-link">Read More</Link>
                    <div style={{display: props.delete?"inline":'none'}} className='news-card-link' onClick={()=>handleDelete(event,props.delete)}>Remove</div>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
