import React from "react";

const NewsCard = ({ title, description, url, webUrl }) => {
  return (
    <div>
      <div
        className="card-news"
        style={{
          width: "25rem",
          border: "1px solid white",
          boxShadow: "10px 10px 10px #888888",
          height: "18rem",
        }}
      >
        <img
          className="card-img-top"
          src={url}
          alt={"no image"}
          style={{ height: "10rem", width: "25rem" }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ marginTop: "10px" }}>
            {title}
          </h5>
          {/* <p className="card-text" style={{marginTop:"10px"}}>{description.slice(0,50)}</p> */}
          <div className="btn-btn-news" style={{ marginTop: "10px" }}>
            <a
              href={!!webUrl ? webUrl : "No Image"}
              class="btn btn-primary"
              style={{
                backgroundColor: "#239BE6",
                height: "40px",
                width: "80px",
                color: "white",
              }}
              onClick={() => description.slice(0, description.length)}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
