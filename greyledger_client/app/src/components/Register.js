import React, { Component } from "react";
import { Link } from 'react-router-dom'
import SetGreyhoundInformation from "./SetGreyhoundInformation";
import UpdateGreyhoundInformation from "./UpdateGreyhoundInformation";
import "../styling/register.css";

// Register new greyhounds and update existing greyhounds
class Register extends Component {

  state = {
    txStatus: "pending"
  }

  setTxStatus = (status) => {
    this.setState({
      txStatus: status
    })
  }

  render() {
    if (this.props.loading) return (
      <div className="register_options">
        <h1 className="register-drizzle">"Loading Drizzle..."</h1>
      </div>
    );

    // Register a new greyhound
    else if (this.props.add === true && this.props.submitted === false) return (
      <div className="register">
        <SetGreyhoundInformation
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          registerNewGreyhound={this.props.registerNewGreyhound}
          users={this.props.users}
          owners={this.props.owners}
          error={this.props.error}
          currentUser={this.props.currentUser}
          setStackId={this.props.setStackId}
          checkTxStatus={this.props.checkTxStatus}
          setTxStatus={this.setTxStatus}
        />
      </div>
    );

    // Update an existing greyhound
    else if (this.props.update === true && this.props.submitted === false) return (
      <div className="register">
        <UpdateGreyhoundInformation
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          updateGreyhound={this.props.updateGreyhound}
          users={this.props.users}
          owners={this.props.owners}
          error={this.props.error}
          currentUser={this.props.currentUser}
        />
      </div>
    );

    // After submission
    else if (this.props.submitted === true && this.state.txStatus === "success") return (
      <div className="register_options">
        <div className="register_options_header"><h1>Thank you for your submission</h1></div>
        <div>
          <button className="add-another-button" onClick={this.props.addAnotherGreyhound}>Add or update another greyhound</button>
        </div>
      </div>
    )

    // After submission
    else if (this.props.submitted === true && this.state.txStatus === "pending") return (
      <div className="register_options">
        <div className="register_options_header"><h1>Transaction pending...</h1></div>
      </div>
    )

    // After submission
    else if (this.props.submitted === true && this.state.txStatus === "error") return (
      <div className="register_options">
        <div className="register_options_header"><h1>Transaction error occurred</h1></div>
        <div ><h3>Please check you are signed in to Metamask and that you have adequate Eth in your account</h3></div>
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
            <div className="button-wrapper"><img className="register_button" onClick={this.props.toggleAddGreyhound} src={require("../images/add.png")} alt="logo"/></div>
            <div className="button-wrapper"><img className="register_button" onClick={this.props.toggleUpdateGreyhound} src={require("../images/circle.png")} alt="logo"/></div>
        </div>
      </div>
    );
  }

}

export default Register
