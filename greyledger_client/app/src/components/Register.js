import React, { Component } from "react";
import SetGreyhoundInformation from "./SetGreyhoundInformation";
import UpdateGreyhoundInformation from "./UpdateGreyhoundInformation";
import "../styling/register.css";

// Register new greyhounds and update existing greyhounds
class Register extends Component {

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
          setStackId={this.props.setStackId}
          checkUpdateTxStatus={this.props.checkUpdateTxStatus}
          setTxStatus={this.setTxStatus}
        />
      </div>
    );

    // After submission
    else if (this.props.submitted === true && this.props.txStatus === "success") return (
      <div className="register_options">
        <div className="register_options_header"><h1>Thank you for your submission</h1></div>
        <div>
          <button className="add-another-button" onClick={this.props.addAnotherGreyhound}>Add or update another greyhound</button>
        </div>
      </div>
    )

    // After submission
    else if (this.props.submitted === true && this.props.txStatus === "pending") return (
      <div className="register_options">
        <div className="register_options_header"><h1>Transaction pending...</h1></div>
        <div className="register_options_header"><h3>Please do not navigate away from this page or hit refresh while your transaction is being processed</h3></div>
        <div className="register_options_header"><h3>Go ahead and click "Confirm" in Metamask</h3></div>

      </div>
    )

    // After submission
    else if (this.props.submitted === true && this.props.txStatus === "error") return (
      <div className="register_options">
        <div className="register_options_header"><h1>Transaction error occurred</h1></div>
        <div className="error-message"><h3>Please check you are signed in to Metamask and that you have adequate ETH in your account</h3></div>
        <div className="error-message"><h3>Your transaction has not been confirmed; please re-submit your form</h3></div>
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
