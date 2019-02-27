import { Component } from 'react';

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
      body: JSON.stringify({ password: password, email: email, first_name: firstname, last_name: lastname })
    })
    .then(resp => resp.json())
    .then(data => {return data})
  }

  static registerNewGreyhound = async (greyhound) => {
    return await fetch(API + '/greyhounds', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: greyhound.name,
        left_ear: greyhound.left_ear,
        right_ear: greyhound.right_ear,
        sire: greyhound.sire,
        sex: greyhound.sex,
        birthdate: greyhound.birthdate,
        status: greyhound.status,
        distemper: greyhound.distemper,
        viral_hepatitis: greyhound.viral_hepatitis,
        leptospira_canicola: greyhound.leptospira_canicola,
        leptospira_icterihaemorrhagiae: greyhound.leptospira_icterihaemorrhagiae,
        parvovirus: greyhound.parvovirus
      })
    })
    .then(resp => resp.json())
    .then(data => {return data})
  }

  // static patchUserInfo = (email, firstname, lastname) => {
  //   fetch(API, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email: email, first_name: firstname, last_name: lastname })
  //   })
  //     .then(resp => resp.json())
  // }

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

  // static updateGreyhound = (information) => {
  //   return fetch(API + "/greyhounds", {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       information
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(data => {return data})
  // }
}
