import React, { Component } from "react";
import "../styling/home.css"

// Home page component
class Home extends Component {

  render(){
    return (
      <div className="home">
        <div className="home-container">

          <div className="home-logo-container">
            <h1>WELCOME   TO  GREYLEDGER</h1>
          </div>
          <div className="home-text-container">
            <div className="home-header">
              <h2>Register new greyhounds</h2>
              <h2>Update greyhound details</h2>
              <h2>Blockchain immutability</h2>
              <h2>See recent transactions on Etherscan</h2>
            </div>
          </div>
          <div className="footer">
            <p>Greyledger is a DApp which digitalizes the greyhound registration papertrail governed by The Greyhound Board of Great Britain.</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Home
