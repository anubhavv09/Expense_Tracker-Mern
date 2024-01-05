import React, { useEffect, useState } from "react";
import "../Styles/income.css";
import Navbar from "./Navbar";
import axios from "axios";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import obj from "./AuthService";
import { z } from 'zod';

const Income = () => {
  const [income, setIncome] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [check, setCheck] = useState(null);
  const [totalIncome, setTotalIncome] = useState([]);
  const [currentIncome, setCurrentIncome] = useState(0);
  const a = JSON.parse(localStorage.getItem("myData"));
  const incomeCurrent = JSON.parse(localStorage.getItem("totalIncome"));
  const result2 = obj.getToken();
  const incomeSchema=z.string().max(15);
  const refrenceSchema=z.string().max(30);
  const apiUrl=import.meta.env.VITE_API_BASE_URL;

  const dataHandler = async (e) => {
    e.preventDefault();
   
    const income1=incomeSchema.safeParse(income);
    const category1=incomeSchema.safeParse(category);
    const desc1=refrenceSchema.safeParse(desc);

    if(!income1.success)
    {
      alert("Length of income is too long")
      return;
    }

    if(!category1.success)
    {
      alert("Length of Characters is long")
      return;
    }


    if(!desc1.success)
    {
      alert("Length of Characters is long")
      return;
    }

  
   


    const parcel = {
      title: income,
      amount: amount,
      date: date,
      category: category,
      description: desc,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${result2}`,
        },
      };
     
      await axios.post(`${apiUrl}transactions`, parcel, config);
      const result = await axios.get(
        `${apiUrl}transactions/getIncome`,
        config
      );
     
    
      setTotalIncome(result.data.data);
      
      // localStorage.setItem('myData',JSON.stringify(result.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOne = async (id) => {
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${result2}`,
        },
      };
      await axios.delete(`${apiUrl}transactions/${id}`);
      const result = await axios.get(
        `${apiUrl}transactions/getIncome`,
        config
      );
      setTotalIncome(result.data.data);
      
      //  localStorage.setItem('myData',JSON.stringify(result.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${result2}`,
          },
        };
        const result = await axios.get(
          `${apiUrl}transactions/income`,
          config
        );
       
        setCurrentIncome(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalIncome();
  }, [totalIncome]);

  useEffect(() => {
    const refresh = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${result2}`,
          },
        };
        const result = await axios.get(
          `${apiUrl}transactions/getIncome`,
          config
        );
        setTotalIncome(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    refresh();
  }, []);

  return (
    <div className="main-1">
      <Navbar />
      <div className="main-out">
        <div className="snack-bar">
          <div className="text-1">
            <p>{`Total Income ${currentIncome}`}</p>
          </div>
        </div>
      </div>
      <div className="form-1">
        <form onSubmit={dataHandler}>
          <input
            type="text"
            name="name"
            placeholder="Income Title"
            onChange={(e) => setIncome(e.target.value)}
            required
          />
          <br></br>
          <input
            type="number"
            name="name"
            placeholder="Income Amount"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <br></br>
          <input
            type="date"
            name="name"
            placeholder="Enter a Date "
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <br></br>
          <input
            type="text"
            name="name"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <br></br>
          <input
            type="text"
            name="name"
            placeholder="Add a Refrence"
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <br></br>
          <button>Submit</button>
        </form>
      </div>
      <div className="show-salary">
        {totalIncome && totalIncome.length > 0 ? (
          <div className="show-salary2">
            {totalIncome.map((element, index) => (
              <ul>
                <li>
                  Title <span>{element.title}</span>
                </li>
                <li>
                  Amount <span>{element.amount}</span>
                </li>
                <li>
                  Date <span>{element.date}</span>
                </li>
                <li>
                  Category <span>{element.category}</span>
                </li>
                <li>
                  Description <span>{element.description}</span>
                </li>
                <li>
                  <i>
                    <MdDelete
                      onClick={() => {
                        deleteOne(element._id);
                      }}
                    />
                  </i>
                </li>
              </ul>
            ))}
          </div>
        ) : (
          <h2></h2>
        )}
      </div>
    </div>
  );
};

export default Income;
