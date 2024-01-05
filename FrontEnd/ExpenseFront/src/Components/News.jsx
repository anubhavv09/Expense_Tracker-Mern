import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import Navbar from "./Navbar";
import "../Styles/News.css";
import News1 from "./News.json";

const News = () => {
  const [store, setStore] = useState([]);
  

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(News1.articles);
        setStore(News1.articles);
        throw new Error("No news ");
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="show-news">
        {store && store.length > 0 ? (
          store.map((element, index) => {
            return (
              <NewsCard
                title={element.title}
                url={element.urlToImage}
                description={element.description}
                webUrl={element.url}
              />
            );
          })
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default News;
