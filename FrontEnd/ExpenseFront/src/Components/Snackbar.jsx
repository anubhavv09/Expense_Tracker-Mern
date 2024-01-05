import React from 'react'
import '../Styles/Snackbar.css'
   const Snackbar = ({min,max}) => {
  return (
          <div>
            <div className="snackbar">
            <div className="snackbar-2">{min}</div>
            <div className="snackbar-3">{max}</div>
          </div>
    </div>
  )
}
export default Snackbar