import React, { Component } from "react";
import { Link } from 'react-router-dom'
import SetGreyhoundInformation from "./SetGreyhoundInformation";
import UpdateGreyhoundInformation from "./UpdateGreyhoundInformation";
import "../styling/register.css";

// Register new greyhounds and update existing greyhounds
class Register extends Component {

  state = {
    addGreyhound: false,
    updateGreyhound: false
  };

  toggleAddGreyhound = () => {
    this.setState({
      addGreyhound: true,
      updateGreyhound: false
    })
  }

  toggleUpdateGreyhound = () => {
    this.setState({
      addGreyhound: false,
      updateGreyhound: true
    })
  }

  addAnotherGreyhound = () => {
    this.props.turnOffSubmitted()
    this.setState({
      addGreyhound: false,
      updateGreyhound: false
    })
  }

  render() {
    if (this.props.loading) return (
      <div className="register_options">
        "Loading Drizzle..."
        <div><Link to="/profile">Close</Link></div>
      </div>
    );

    // Register a new greyhound
    else if (this.state.addGreyhound === true && this.props.submitted === false) return (
      <div className="Registration">
        <SetGreyhoundInformation
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          registerNewGreyhound={this.props.registerNewGreyhound}
          users={this.props.users}
          owners={this.props.owners}
          error={this.props.error}
          currentUser={this.props.currentUser}
        />
        <div><Link to="/profile">Close</Link></div>
      </div>
    );

    // Update an existing greyhound
    else if (this.state.updateGreyhound === true && this.props.submitted === false) return (
      <div className="UpdateGreyhound">
        <UpdateGreyhoundInformation
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          updateGreyhound={this.props.updateGreyhound}
          users={this.props.users}
          owners={this.props.owners}
          error={this.props.error}
          currentUser={this.props.currentUser}
        />
        <div><Link to="/profile">Close</Link></div>
      </div>
    );

    // After submission
    else if (this.props.submitted === true) return (
      <div >
        <div><h1>Thank you for your submission</h1></div>
        <div>
          <button onClick={this.addAnotherGreyhound}>Add or update another greyhound</button>
        </div>
        <div><Link to="/profile" className="link" onClick={this.props.turnOffSubmitted}>Close</Link></div>
      </div>
    )

    // New selection
    else return (
      <div className="register_options">
        <div className="register_options_container">
          <div className="register_options_header"><h1>Select an option</h1></div>
          <div className="metamask-image">
            <img src={require("../images/pay-with-metamask.png")} alt="logo"/>
          </div>
        </div>
        <div className="buttons-container">
          <div className="button-selection">
            <img className="register_button" onClick={this.toggleAddGreyhound} src={require("../images/add.png")} alt="logo"/>
            <img className="register_button" onClick={this.toggleUpdateGreyhound} src={require("../images/circle.png")} alt="logo"/>
          </div>
        </div>
        <div className="register-link-section"><Link to="/profile" className="register-link">Close</Link></div>
      </div>
    );
  }

}

export default Register
