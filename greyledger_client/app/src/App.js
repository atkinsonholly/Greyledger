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
import Search from "./components/search";

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
    selectedGreyhound: null,
    transactions: [],
    search: '',
    stackId: "",
    addGreyhound: false,
    updateGreyhound: false,
    txStatus: "pending"
  };

  setStackId = (input) => {
    this.setState({
      stackId: input
    });
  }

  checkTxStatus = (id, response) => {
    if (this.state.stackId !== "") {
      const txId = this.state.drizzleState.transactionStack[this.state.stackId]
      const txStatus = this.state.drizzleState.transactions[txId]
      if (txStatus) {
        if (txStatus === undefined) return ""
        console.log(txStatus.status)
        this.setState({
          txStatus: txStatus.status
        })
      }
      if (this.state.txStatus === "success") {
        window.clearInterval(id)
        this.confirmGreyhoundToDB(response.id)
      }
      if (this.state.txStatus === "error") {
        window.clearInterval(id)
        console.log(response)
        this.deleteGreyhoundFromDB(response.id)
      }
      console.log(this.state.txStatus)
    }
  }

  checkUpdateTxStatus = (id, response) => {
    if (this.state.stackId !== "") {
      const txId = this.state.drizzleState.transactionStack[this.state.stackId]
      const txStatus = this.state.drizzleState.transactions[txId]
      if (txStatus) {
        if (txStatus === undefined) return ""
        this.setState({
          txStatus: txStatus.status
        })
      }
      if (this.state.txStatus === "success") {
        window.clearInterval(id)
      }
      if (this.state.txStatus === "error") {
        window.clearInterval(id)
        this.revertDB(response)
      }
      console.log(this.state.txStatus)
    }
  }

  revertDB = async(response) => {
    await Adapter.revertDB(response);
    this.getUserFromAPI();
  }

  confirmGreyhoundToDB = async (id) => {
    await Adapter.confirmGreyhoundToDB(id)
    this.getUserFromAPI()
  }

  deleteGreyhoundFromDB = async (id) => {
    await Adapter.deleteGreyhoundFromDB(id)
    this.getUserFromAPI()
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
        })
      }
    });
  }

  loginUser = async (email, password) => {
    const data = await Adapter.loginUser(email, password)
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
      error: null,
      submitted: false,
      selectedGreyhound: null,
      transactions: [],
      search: '',
      addGreyhound: false,
      updateGreyhound: false
    })
  }

  fetchTxList = async (address, event) => {
    event.preventDefault()
    if (this.state.search !== '') {
      const data = await Adapter.fetchTxList(address)
      if (typeof(data.result) !== 'string') {
        this.setState({
          transactions: data.result,
          search: ''
        })
      }
      else {
        this.setState({
          transactions: "error",
          search: ''
        })
      }
    }
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
      alert('Please provide valid greyhound / owner details. ' + data.exception)
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
      submitted: false,
      addGreyhound: false,
      updateGreyhound: false,
      txStatus: "pending"
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
      alert('Please provide valid greyhound / owner details. ' + data.exception)
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

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      search: event.target.value
    })
  }

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

  addAnotherGreyhound = () => {
    this.turnOffSubmitted()
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.currentUser) {
      return (
        <div className="App">
          <main>
              <Navbar currentUser={this.state.currentUser} logoutUser={this.logoutUser} turnOffSubmitted={this.turnOffSubmitted}/>
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
                      setStackId={this.setStackId}
                      toggleAddGreyhound={this.toggleAddGreyhound}
                      toggleUpdateGreyhound={this.toggleUpdateGreyhound}
                      add={this.state.addGreyhound}
                      update={this.state.updateGreyhound}
                      addAnotherGreyhound={this.addAnotherGreyhound}
                      checkTxStatus={this.checkTxStatus}
                      checkUpdateTxStatus={this.checkUpdateTxStatus}
                      txStatus={this.state.txStatus}
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
                  <Route exact path="/search" component={() =>
                    <Search
                      fetchTxList={this.fetchTxList}
                      currentUser={this.state.currentUser}
                      search={this.state.search}
                      transactions={this.state.transactions}
                      handleChange={this.handleChange}
                    />}
                  >
                  </Route>
                  {this.state.selectedGreyhound ?
                    <Route exact path={this.state.selectedGreyhound ? "/greyhounds/"+this.state.selectedGreyhound.id : "/"} component={() =>
                        <GreyhoundShow
                          selectedGreyhound={this.state.selectedGreyhound}
                          drizzle={this.props.drizzle}
                          drizzleState={this.state.drizzleState}
                        />}
                    >
                    </Route>
                    :
                    null}
                  <Route exact path="/" component={() => <Home currentUser={this.state.currentUser} />}></Route>
              </Switch>
              </div>
            </main>
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
