import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Adapter from './adapters/API'
import "./styling/App.css";

//Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Profile from './components/Profile';
import Update from './components/Update';
import LoginCollection from './components/LoginCollection';

class App extends Component {

  state = {
    loading: true,
    drizzleState: null,
    greyhounds: [],
    currentUser: null
  };

  loginUser = async (email, password) => {
    const data = await Adapter.loginUser(email, password)
      if (data !== undefined) {
        localStorage.setItem('token', data.token);
        const user = this.getUserFromAPI();
        const greyhounds = this.fetchGreyhounds();
        this.setState({
          currentUser: user,
          currentUserGreyhounds: data.user.greyhounds,
          greyhounds: greyhounds
        })
      }
      else if (data === undefined) {
        return
      }
  };

  logoutUser = () => {
    localStorage.removeItem('token');
    this.setState({
      currentUser: null
    })
  }

  signupUser = async (password, email, firstname, lastname) => {
    const data = await Adapter.signupUser(password, email, firstname, lastname);
    if (data.token !== undefined) {
      localStorage.setItem('token', data.token);
    }
    this.getUserFromAPI();
  }

  // patchUserInfo = (email, firstname, lastname) => {
  //   Adapter.patchUserInfo(email, firstname, lastname)
  // }

  getUserFromAPI = async() => {
    const data = await Adapter.getUserFromAPI();
    this.setState({
      currentUser: data
    })
  }

  fetchGreyhounds = async() => {
    const data = await Adapter.fetchGreyhounds()
    this.setState({
      greyhounds: data.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      })
    })
  }

  // componentDidMount(){
  //   const token = localStorage.getItem('token')
  //   if (!!token){
  //     this.getUserFromAPI();
  //   }
  // }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (!!token){
      this.getUserFromAPI();
    }

    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.currentUser) {
      return (
        <div className="App">
            <Navbar currentUser={this.state.currentUser} logoutUser={this.logoutUser}/>
            <main>
              <div className="main-container">
                <Switch>
                  <Route exact path="/register" component={() => <Register drizzle={this.props.drizzle} currentUser={this.state.currentUser} loading={this.state.loading} drizzleState={this.state.drizzleState} />}></Route>
                  <Route exact path="/profile" component={() => <Profile drizzle={this.props.drizzle} currentUser={this.state.currentUser} loading={this.state.loading} drizzleState={this.state.drizzleState} currentUserGreyhounds={this.state.currentUserGreyhounds}/>}></Route>
                  <Route exact path="/update" component={() => <Update currentUser={this.state.currentUser}/>}></Route>
                  <Route exact path="/" component={() => <Home currentUser={this.state.currentUser} />}></Route>
              </Switch>
              </div>
            </main>
            <div className="footer">
              <p>Footer text</p>
            </div>
        </div>
      );
    }

    else {
      return (
        <div className="login-page">
          <LoginCollection login={this.loginUser} signup={this.signupUser} />
        </div>
      );
    }
  }
}

export default App;
