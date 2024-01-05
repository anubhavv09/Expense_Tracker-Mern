import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard';
import Navbar from './Navbar';
import '../Styles/News.css'


const News = () => {
    const[store,setStore]=useState([]);
    const apiUrl=import.meta.env.VITE_API_BASE_URL;
     
    useEffect(()=>{
        const getData=async()=>{

          try{
            const result= await axios.get(`${apiUrl}verify/getNews`);

            if(result)
            {
              setStore(result.data);
            }
            else{
              throw new Error("No news ")
            }

          }catch(error)
          {
          console.log(error);
          }
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