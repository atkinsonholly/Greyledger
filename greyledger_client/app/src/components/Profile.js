import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import ReadContractOutput from "./ReadContractOutput";

// Show currentUser's profile
class Profile extends Component {

  render(){
    return (
      <div className="profile">
        <div className="profile-container">
          <div>
            <h2>Welcome, <span></span></h2>
          </div>
          <div>
              <h3>Your Greyhounds</h3>
                {this.props.loading && this.props.drizzleState === null ?
                  <div>"Loading Drizzle..."</div>
                :
                  <div>
                    <ReadContractOutput
                      drizzle={this.props.drizzle}
                      drizzleState={this.props.drizzleState}
                    />
                  </div>
                }
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
