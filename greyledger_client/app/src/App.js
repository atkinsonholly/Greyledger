import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Adapter from './adapters/API'
import "./styling/App.css";
import Navbar from './components/Navbar'
import Register from './components/Register'
import Profile from './components/Profile'

class App extends Component {

  state = {
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

  render() {
    return (
      <div className="App">
          <Navbar />
          <Switch>
            <Route path="/register" component={() => <Register drizzle={this.props.drizzle} currentUser={this.state.currentUser}/>}></Route>
            <Route path="/profile" component={() => <Profile drizzle={this.props.drizzle} currentUser={this.state.currentUser}/>}></Route>
            <Route path="/update" component={() => <Profile drizzle={this.props.drizzle} currentUser={this.state.currentUser}/>}></Route>
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
