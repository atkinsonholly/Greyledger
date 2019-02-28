import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Adapter from './adapters/API'
import "./styling/App.css";

//Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Profile from './components/Profile';
import LoginCollection from './components/LoginCollection';
import GreyhoundShow from "./components/GreyhoundShow";

class App extends Component {

  state = {
    loading: true,
    drizzleState: null,
    greyhounds: [],
    users: [],
    owners: [],
    currentUser: null,
    error: null,
    submitted: false,
    selectedGreyhound: null
  };

  loginUser = async (email, password) => {
    const data = await Adapter.loginUser(email, password)
    console.log(data)
    if (data.message) {
      this.setState({error: data.message})
    }
    else if (data !== undefined) {
      localStorage.setItem('token', data.token);
      this.getUserFromAPI();
      this.fetchGreyhounds();
      this.fetchUsers();
      this.fetchOwners();
      this.setState({
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
      this.getUserFromAPI();
      this.fetchGreyhounds();
      this.fetchUsers();
      this.fetchOwners();
      this.setState({
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
      greyhounds: data
    })
  }

  fetchUsers = async() => {
    const data = await Adapter.fetchUsers()
    this.setState({
      users: data
    })
  }

  fetchOwners = async() => {
    const data = await Adapter.fetchOwners()
    this.setState({
      owners: data
    })
  }

  registerNewGreyhound = async(greyhound, owners, currentUser) => {
    const data = await Adapter.registerNewGreyhound(greyhound, owners, currentUser);
    if (data.error) {
      alert('Please provide valid greyhound / owner details')
      return false
    }
    this.getUserFromAPI();
    this.fetchGreyhounds();
    this.fetchUsers();
    this.fetchOwners();
    this.setState({
      submitted: true
    })
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
      alert('Please provide valid greyhound / owner details')
      return false
    }
    this.getUserFromAPI();
    this.fetchGreyhounds();
    this.fetchUsers();
    this.fetchOwners();
    this.setState({
      submitted: true
    })
    return data
  }

  selectGreyhound = (id) => {
    if (this.state.currentUser.greyhounds.length === 0){
      return
    } else {
      const selectedGreyhound = this.state.currentUser.greyhounds.find( greyhound => greyhound.id === id)
      this.setState({
        selectedGreyhound: selectedGreyhound
      })
    }
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
                      selectGreyhound={this.selectGreyhound}
                    />}
                  >
                  </Route>
                  {this.state.selectedGreyhound ?
                    <Route exact path={this.state.selectedGreyhound ? "/greyhounds/"+this.state.selectedGreyhound.id : "/"} component={() =>
                        <GreyhoundShow
                          selectedGreyhound={this.state.selectedGreyhound}
                        />}
                    >
                    </Route>
                    :
                    null}
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
