import { Component } from 'react';
import API_KEY from '../apikey'

const API = 'http://localhost:3000/api/v1'
const ETHERSCAN = 'https://api-rinkeby.etherscan.io/'

export default class Adapter extends Component {

  static fetchTxList = async(address) => {
    return await fetch (ETHERSCAN + 'api?module=account&action=txlist&address=' + address + '&page=1&offset=10&sort=desc&apikey=' + API_KEY)
    .then(resp => resp.json())
    .then(data => {return data})
  }

  static loginUser = async (email, password) => {
    return await fetch(API + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password})
    })
    .then(resp => resp.json())
    .then(data => {return data})
  }

  static signupUser = async (password, email, firstname, lastname) => {
    return await fetch(API + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: password, email: email, first_name: firstname, last_name: lastname })
    })
    .then(resp => resp.json())
    .then(data => {return data})
  }

  static registerNewGreyhound = async (greyhound, owners, currentUserId) => {
    return await fetch(API + '/greyhounds/register', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        greyhound: greyhound, owners: owners, currentUserId: currentUserId
      })
    })
    .then(resp => resp.json())
    .then(data => {return data})
  }

  static updateGreyhound = async (greyhound, owners, currentUserId) => {
    return await fetch(API + '/greyhounds/register_update', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        greyhound: greyhound, owners: owners, currentUserId: currentUserId
      })
    })
    .then(resp => resp.json())
    .then(data => {return data})
  }

  static fetchGreyhounds = async() => {
    const response = await fetch(API + "/greyhounds", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await response.json()
    return json
  }

  static fetchUsers = async() => {
    const response = await fetch(API + "/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await response.json()
    return json
  }

  static fetchOwners = async() => {
    const response = await fetch(API + "/owners", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await response.json()
    return json
  }

  static getUserFromAPI = async() => {
    const response = await fetch(API + '/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await response.json()
    return json
  }

}
