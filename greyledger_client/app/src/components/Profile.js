import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import ReadContractOutput from "./ReadContractOutput";

// Show currentUser's profile
class Profile extends Component {

  render(){
    if (this.props.loading) return (
      <div className="profile">
        <div className="profile-container">
          <div>
            <h2>Welcome, <span></span></h2>
          </div>
          <div>
              <h3>Your Greyhounds</h3>
              <div>"Loading Drizzle..."</div>
          </div>
          <div><Link to="/register">Add or update Greyhound details</Link></div>
          <div><Link to="/update">Update personal details</Link></div>
          <div><Link to="/">Close</Link></div>
        </div>
      </div>
    );

    return (
      <div className="profile">
        <div className="profile-container">
          <div>
            <h2>Welcome, <span></span></h2>
          </div>
          <div>
              <h3>Your Greyhounds</h3>
                <div>

                </div>
          </div>
          <div><Link to="/register">Add or update Greyhound details</Link></div>
          <div><Link to="/update">Update personal details</Link></div>
          <div><Link to="/">Close</Link></div>
        </div>
      </div>
    );

  }

}

export default Profile
