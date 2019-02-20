import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./styling/App.css";
import Navbar from './Navbar'
import Register from './Register'

class App extends Component {

  state = {

  };


  render() {


    return (
      <div className="App">
          <Navbar />
          <Switch>
            <Route path="/register" component={() => <Register drizzle={this.props.drizzle} drizzleState={this.state.drizzleState}/>}></Route>
          </Switch>
          <main>
            <div className="main-container">
            </div>
          </main>
          <div className="footer">
            <p>Footer text</p>
          </div>
      </div>
    );
  }

}

export default App;
