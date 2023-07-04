import React from "react";
const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="container my-3">
            <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark">
                    <span className="visually-hidden">{source}</span>
                </span>
                <img className="card-img-top" src={!imageUrl ? "/Resources/imageNotFound.gif" : imageUrl} alt='' />
                <div className="card-body">
                    <h5 className="card-title"><strong>{title}</strong></h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By <strong>{author ? author : "Unknown"}</strong> on <strong>{new Date(date).toGMTString()}</strong></small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="read-btn btn btn-dark">Read News &rarr;</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;