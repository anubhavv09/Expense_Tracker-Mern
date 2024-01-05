import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import obj from './AuthService';

const Chart = () => {
  const [income, setIncome] = useState(0);
  const [expense,setExpense]=useState(0);
  const result2=obj.getToken();
  const apiUrl=import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${result2}`
          }
        };
        const result = await axios.get(`${apiUrl}transactions/income`,config);
      
        setIncome(result.data?.data || 0);
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    };

    fetchData();

    const current=async()=>{
         
        try{
          const config={
            headers:{
              Authorization:`Bearer ${result2}`
            }
          };
            const result=await axios.get(`${apiUrl}transactions/total`,config);
             setExpense(result.data.data)
           
        }
        catch(error)
        {
            console.log(error)
        }
       
    };

    current();
  }, []);

  const data02 = [
    {
      name: 'Income',
      value: income,
      color: '#08F26E',
    },
    {
      name: 'Expense',
      value: expense, 
      color: '#C60000',
    },
  ];

  const data03=[
    {
        name: 'No Records',
        value: 100,
      },
  ]

  return (
    <div>
     {
     !income&&!expense && income===0&&expense===0?(
       
        <PieChart width={300} height={300}>
         <Pie data={data03} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={0} outerRadius={100} fill="#A0A0A0" />
    
        </PieChart>
           
        ):(


            <PieChart width={300} height={300}>
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={100}
              label
            >
              {data02.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        )
     }
     <div className="show-bar">
             <div className='show-box-1'>
            
            </div>
            <div className='show-box-2'>
            
            </div>
            <div className="show-box-3">
           
            </div>
          </div>

      
    </div>
  );
};

export default Chart;
