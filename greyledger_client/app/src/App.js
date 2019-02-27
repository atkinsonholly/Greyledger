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
    users: [],
    owners: [],
    currentUser: null,
    error: null,
    submitted: false
  };

  loginUser = async (email, password) => {
    const data = await Adapter.loginUser(email, password)
    console.log(data)
    if (data.message) {
      this.setState({error: data.message})
    }
    else if (data !== undefined) {
      localStorage.setItem('token', data.token);
      const user = this.getUserFromAPI();
      const greyhounds = this.fetchGreyhounds();
      const users = this.fetchUsers();
      const owners = this.fetchOwners();
      this.setState({
        currentUser: user,
        greyhounds: greyhounds,
        users: users,
        owners: owners,
        error: null
      })
    }
  };

  logoutUser = () => {
    localStorage.removeItem('token');
    this.setState({
      currentUser: null,
      currentUserGreyhounds: [],
      error: null,
      submitted: false
    })
  }

  signupUser = async (password, email, firstname, lastname) => {
    const data = await Adapter.signupUser(password, email, firstname, lastname);
    console.log(data)
    if (data.error) {
      this.setState({error: data.exception})
    }
    if (data.token !== undefined) {
      localStorage.setItem('token', data.token);
      const user = this.getUserFromAPI();
      const greyhounds = this.fetchGreyhounds();
      const users = this.fetchUsers();
      const owners = this.fetchOwners();
      this.setState({
        currentUser: user,
        greyhounds: greyhounds,
        users: users,
        owners: owners,
        error: null
      })
    }
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

  fetchUsers = async() => {
    const data = await Adapter.fetchUsers()
    this.setState({
      users: data.sort(function (a, b) {
        return a.last_name.localeCompare(b.last_name);
      })
    })
  }

  fetchOwners = async() => {
    const data = await Adapter.fetchOwners()
    this.setState({
      owners: data.sort(function (a, b) {
        return a.last_name.localeCompare(b.last_name);
      })
    })
  }

  registerNewGreyhound = async(greyhound, owners, currentUser) => {
    const data = await Adapter.registerNewGreyhound(greyhound, owners, currentUser);
    if (data.error) {
      alert('This form contains errors and cannot be submitted')
      this.setState({error: data.exception})
      return
    }
    return data
  }

  turnOffSubmitted = () => {
    this.setState({
      submitted: false
    })
  }

  turnOnSubmitted = () => {
    this.setState({
      submitted: true,
      errors: null
    })
  }

  updateGreyhound = async(greyhound, owners, currentUser) => {
    const data = await Adapter.updateGreyhound(greyhound, owners, currentUser);
    if (data.error) {
      alert('This form contains errors and cannot be submitted')
      this.setState({error: data.exception})
      return
    }
    return data
  }

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
        this.setState({
          loading: false,
          drizzleState
        });
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
            <Navbar currentUser={this.state.currentUser} logoutUser={this.logoutUser} turnOffSubmitted={this.turnOffSubmitted}/>
            <main>
              <div className="main-container">
                <Switch>
                  <Route exact path="/register" component={() =>
                    <Register
                      drizzle={this.props.drizzle}
                      currentUser={this.state.currentUser}
                      loading={this.state.loading}
                      drizzleState={this.state.drizzleState}
                      registerNewGreyhound={this.registerNewGreyhound}
                      users={this.state.users}
                      owners={this.state.owners}
                      error={this.state.error}
                      submitted={this.state.submitted}
                      turnOffSubmitted={this.turnOffSubmitted}
                      turnOnSubmitted={this.turnOnSubmitted}
                      updateGreyhound={this.updateGreyhound}
                    />}
                  >
                  </Route>
                  <Route exact path="/profile" component={() =>
                    <Profile
                      drizzle={this.props.drizzle}
                      currentUser={this.state.currentUser}
                      loading={this.state.loading}
                      drizzleState={this.state.drizzleState}
                    />}
                  >
                  </Route>
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
          <LoginCollection login={this.loginUser} signup={this.signupUser} error={this.state.error}/>
        </div>
      );
    }
  }
}

export default App;
