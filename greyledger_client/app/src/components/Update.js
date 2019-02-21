import React from 'react'
import { Link } from 'react-router-dom'

// Update currentUser's personal details
const Update = (props) => {
    return (
      <div className="update">
        <div className="update-container">
          <div>
            [Update personal details stuff]
          </div>
          <div><Link to="/profile">Close</Link></div>
        </div>
      </div>
    )
}

export default Update
