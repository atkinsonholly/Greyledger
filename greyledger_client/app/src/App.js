import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Adapter from './adapters/API'
import "./styling/App.css";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Profile from './components/Profile'
import Update from './components/Update'
// import ReadContractOutput from "./components/ReadContractOutput";
// import SetGreyhoundInformation from "./components/SetGreyhoundInformation";

class App extends Component {

  state = {
    loading: true,
    drizzleState: null,
    users: [],
    greyhounds: [],
    currentUser: null
  };

  // loginUser = async (email, password) => {
  //   const data = await Adapter.loginUser(email, password)
  //     if (data !== undefined) {
  //       localStorage.setItem('token', data.token)
  //       this.getUserFromAPI()
  //       this.fetchUsers()
  //     }
  //     else if (data === undefined) {
  //       return
  //     }
  // }
  //
  // logoutUser = () => {
  //   localStorage.removeItem('token')
  //   this.setState({
  //     currentUser: null,
  //     selectedUser: null
  //   })
  // }

  // signupUser = async (username, password, email, firstname, lastname, profile_pic_url) => {
  //   const data = await Adapter.signupUser(username, password, email, firstname, lastname, profile_pic_url)
  //   console.log(data)
  //   this.getUserFromAPI()
  //   this.fetchUsers()
  // }

  // patchUserInfo = (email, firstname, lastname) => {
  //   Adapter.patchUserInfo(email, firstname, lastname)
  // }

  // getUserFromAPI = async() => {
  //   const data = await Adapter.getUserFromAPI()
  //   this.setState({
  //     currentUser: data
  //   })
  // }

  // fetchUsers = async() => {
  //   const data = await Adapter.fetchUsers()
  //   this.setState({
  //     users: data
  //   })
  // }

  // fetchGreyhounds = async() => {
  //   const data = await Adapter.fetchGreyhounds()
  //   this.setState({
  //     greyhounds: data.sort(function (a, b) {
  //       return a.name.localeCompare(b.name);
  //     })
  //   })
  // }

  // handleClick = (info) => {
  //   this.setState({selectedUser: info})
  // }
  //
  // componentDidMount(){
  //   const token = localStorage.getItem('token')
  //   if (!!token){
  //     this.getUserFromAPI()
  //     this.fetchUsers()
  //   }
  // }

  componentDidMount() {
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
    return (
      <div className="App">
          <Navbar />
          <main>
            <div className="main-container">
              <Switch>
                <Route path="/register" component={() => <Register drizzle={this.props.drizzle} currentUser={this.state.currentUser} loading={this.state.loading} drizzleState={this.state.drizzleState} />}></Route>
                <Route path="/profile" component={() => <Profile drizzle={this.props.drizzle} currentUser={this.state.currentUser} loading={this.state.loading} drizzleState={this.state.drizzleState} />}></Route>
                <Route path="/update" component={() => <Update currentUser={this.state.currentUser}/>}></Route>
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

}

export default App;
