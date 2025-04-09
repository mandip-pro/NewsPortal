import React from 'react';
import './NewsCard.css'; // Assuming you'll create a CSS file for styling
import { Link } from 'react-router-dom';

function NewsCard(props){
    return (
        <div className="news-card">
            <img src={props.image} alt={"loading..."} className="news-card-image" />
            <div className="news-card-content">
                <h3 className="news-card-title">{props.title}</h3>
                <p className="news-card-description">{props.description}</p>
                {/* <Link to={`/Content/${props.id}`} target="_blank" rel="noopener noreferrer" className="news-card-link">Read More</Link> */}
                <Link to={`/Content/${props.id}`} className="news-card-link">Read More</Link>

            </div>
        </div>
    );
};

export default NewsCard;
