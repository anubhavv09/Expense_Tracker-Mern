import React from 'react'
import '../Styles/Header.css'

const SnackBarHeader = ({val,icon}) => {
  return (
    <div>
        <div className="salary-header-1">
            <div className="min-s">
              <p className="p-snackbar">Min</p>
            </div>
            <div className="snackbar-salary">
              <p className="p-snackbar-salary">{val}{icon}</p>
            </div>

            <div className="max-s">
              <p className="p-snackbar">Max</p>
            </div>
          </div>
    </div>
  )
}

export default SnackBarHeader