import React, { Component } from "react";
import { Link } from 'react-router-dom'
import SetGreyhoundInformation from "./SetGreyhoundInformation";
import UpdateGreyhoundInformation from "./UpdateGreyhoundInformation";

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

  addAnotherGreyhound = () => {
    this.props.turnOffSubmitted()
    this.setState({
      addGreyhound: false,
      updateGreyhound: false
    })
  }

  toggleUpdateGreyhound = () => {
    this.setState({
      addGreyhound: false,
      updateGreyhound: true
    })
  }

  render() {
    if (this.props.loading) return (
      <div>
        "Loading Drizzle..."
        <div><Link to="/profile">Close</Link></div>
      </div>
    );

    else if (this.state.addGreyhound === true && this.props.submitted === false) return (
      <div className="Registration">
        <SetGreyhoundInformation
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          registerNewGreyhound={this.props.registerNewGreyhound}
          users={this.props.users}
          owners={this.props.owners}
          error={this.props.error}
          turnOnSubmitted={this.props.turnOnSubmitted}
        />
        <div><Link to="/profile">Close</Link></div>
      </div>
    );

    else if (this.state.updateGreyhound === true && this.props.submitted === false) return (
      <div className="UpdateGreyhound">
        <UpdateGreyhoundInformation
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          registerNewGreyhound={this.props.updateGreyhound}
          users={this.props.users}
          owners={this.props.owners}
          error={this.props.error}
          turnOnSubmitted={this.props.turnOnSubmitted}
        />
        <div><Link to="/profile">Close</Link></div>
      </div>
    );

    else if (this.props.submitted === true) return (
      <div>
        Thank you for your submission
        <button onClick={this.addAnotherGreyhound}>Add or update another greyhound</button>
        <div><Link to="/profile" onClick={this.props.turnOffSubmitted}>Close</Link></div>
      </div>
    )

    else return (
      <div>
        <button onClick={this.toggleAddGreyhound}>Add New Greyhound</button>
        <button onClick={this.toggleUpdateGreyhound}>Update Existing Greyhound</button>
        <div><Link to="/profile">Close</Link></div>
      </div>
    );
  }

}

export default Register
