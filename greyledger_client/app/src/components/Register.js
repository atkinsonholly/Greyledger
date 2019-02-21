import React, { Component } from "react";
import { Link } from 'react-router-dom'
import ReadContractOutput from "./ReadContractOutput";
import SetGreyhoundInformation from "./SetGreyhoundInformation";

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

  render() {
    if (this.props.loading) return (
      <div>
        "Loading Drizzle..."
        <div><Link to="/profile">Close</Link></div>
      </div>
    );
    //
    // if (this.state.addGreyhound === true) return (
    //   <div className="Registration">
    //       [New greyhound form]
    //
    //       <SetGreyhoundInformation
    //         drizzle={this.props.drizzle}
    //         drizzleState={this.props.drizzleState}
    //       />
    //       <div><Link to="/profile">Close</Link></div>
    //   </div>
    // );

    if (this.state.updateGreyhound === true) return (
      <div className="UpdateGreyhound">
        Update greyhound form
        <div><Link to="/profile">Close</Link></div>
      </div>
    );

    else return (
      <div>
        {this.state.addGreyhound === false ? <ReadContractOutput
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
        /> : null}
        <button onClick={this.toggleAddGreyhound}>Add New Greyhound</button>
        <button onClick={this.toggleUpdateGreyhound}>Update Existing Greyhound</button>
        <div><Link to="/profile">Close</Link></div>
      </div>
    );
  }

}

export default Register
