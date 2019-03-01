import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import ReadContractOutput from "./ReadContractOutput";
import "../styling/profile.css"

// Show currentUser's profile
class Profile extends Component {

  render(){
    return (
      <div className="profile">
        <div className="profile-container">
          <div className="profile-welcome">
            <h1>Welcome, <span>{this.props.currentUser.first_name}</span></h1>
          </div>
          <div>
            <h3>What would you like to do?</h3>
          </div>
          <div className="profile-link"><Link to="/register" className="link">Register or update a greyhound</Link></div>
          <div className="profile-link"><Link to="/" className="link">Go back to the home page</Link></div>
          <div className="profile-blockchain">
              <h3>Blockchain:</h3>
                {this.props.loading && this.props.drizzleState === null ?
                  <div>"Loading Drizzle..."</div>
                :
                  <div classname="profile-blockchain">
                    <ReadContractOutput
                      drizzle={this.props.drizzle}
                      drizzleState={this.props.drizzleState}
                    />
                  </div>
                }
          </div>
          <div className="profile-greyhounds">
            <h3>Your greyhounds:</h3>
            {this.props.currentUser.greyhounds
              .sort(function (a, b) { return a.name.localeCompare(b.name) })
              .map(greyhound =>
                <li>
                  <Link to={"/greyhounds/" + greyhound.id} className="link" onClick={() => this.props.selectGreyhound(greyhound.id)}>
                  {greyhound.name}
                  </Link>
                </li>
              )
            }
          </div>

        </div>
      </div>
    );
  }

}

export default Profile
