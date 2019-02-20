import { Component } from 'react';

// Talk to Ruby on Rails
const API = 'http://localhost:3000/api/v1'

export default class Adapter extends Component {

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
      body: JSON.stringify({ password: password, email: email, firstname: firstname, lastname: lastname })
    })
    .then(resp => resp.json())
    .then(data => {return data})
  }

  static patchUserInfo = (email, firstname, lastname) => {
    fetch(API, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, firstname: firstname, lastname: lastname })
    })
      .then(resp => resp.json())
  }

  static fetchUsers = async () => {
    const response = await fetch(API + '/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await response.json()
    return json
  }

  static fetchGreyhounds = async() => {
    const response = await fetch(API + "/greyhounds")
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

  static updateGreyhounds = (information) => {
    return fetch(API + "/greyhounds", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        information
      })
    })
    .then(res => res.json())
    .then(data => {return data})
  }
}
