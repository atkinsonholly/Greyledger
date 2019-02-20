import React from 'react'
import { Link } from 'react-router-dom'

// Show currentUser's profile
const Profile = (props) => {
    return (
      <div className="profile">
        <div className="profile-container">
          <div>
            <h2>Welcome, <span></span></h2>
          </div>
          <div>
              <h3>Your Greyhounds</h3>
          </div>
          <div><Link to="/register">Add or update Greyhound details</Link></div>
          <div><Link to="/update">Update personal details</Link></div>
          <div><Link to="/">Close</Link></div>
        </div>
      </div>
    )
}

export default Profile
