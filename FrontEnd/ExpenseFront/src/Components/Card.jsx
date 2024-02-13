import React, { memo } from 'react'
import '../Styles/Card.css'

const Card = memo(({title,value}) => {
  return (
    <div>
        <div className="card">
              <div className="card-1">
                <p className="p-1">{title}</p>
              </div>
              <div className="card-2">
                <p className="p-2">{value}</p>
              </div>
              
            </div>
           
    </div>
  )
})
export default Card