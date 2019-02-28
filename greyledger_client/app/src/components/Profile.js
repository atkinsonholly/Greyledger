import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import GreyhoundLink from './GreyhoundLink'
import ReadContractOutput from "./ReadContractOutput";
import GreyhoundShow from "./GreyhoundShow"

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
          <div><Link to="/register" className="link">Add or update Greyhound details</Link></div>
          <div><Link to="/update" className="link">Update personal details</Link></div>
          <div><Link to="/" className="link">Close</Link></div>
        </div>
      </div>
    );
  }

}

export default Profile
