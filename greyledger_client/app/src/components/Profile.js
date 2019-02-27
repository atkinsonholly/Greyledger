import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import Greyhound from './Greyhound'
import ReadContractOutput from "./ReadContractOutput";

// Show currentUser's profile
class Profile extends Component {

  render(){
    return (
      <div className="profile">
        <div className="profile-container">
          <div>
            <h2>Welcome, <span>{this.props.currentUser.first_name}</span></h2>
          </div>
          <div>
              <h3>There are:</h3>
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
                Registered on the blockchain
          </div>
          <div>
            <h3>Your greyhounds:</h3>
            {this.props.currentUser.greyhounds.map(greyhound => <Greyhound key={greyhound.id} greyhound={greyhound}/>)}
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
