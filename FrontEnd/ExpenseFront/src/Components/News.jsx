import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard';
import Navbar from './Navbar';
import '../Styles/News.css'

const News = () => {
    const[store,setStore]=useState([]);
     
    useEffect(()=>{
        const getData=async()=>{
          const result= await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=business&sortBy=publishedAt&pageSize=10&apiKey=b7c843d4002d410b9581e6fa74aa1568');
        
          
          setStore(result.data.articles);


        }
       getData();

    },[])


   return (
    <div>
        <Navbar/>
        <div className='show-news'>
            
           
            {
                store&&store.length>0?(
                    store.map((element,index)=>{
                   
                      return  <NewsCard title={element.title} url={element.urlToImage} description={element.description} webUrl={element.url}/>
                    })

                ):(<> </>)
            }
          

        </div>
   
    </div>
  )
}

export default News