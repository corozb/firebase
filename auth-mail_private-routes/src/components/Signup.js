import React from 'react'
import { withRouter } from 'react-router'

import app from '../firebaseConfig'

const Signup = ({ history }) => {
  const handleLogin = (e) => {
    e.preventDefault()
    const { email, password } = e.target.elements

    try {
      app.auth().createUserWithEmailAndPassword(email.value, password.value)
      history.push('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name='email' type='email' placeholder='Email' />
        </label>
        <label>
          Password
          <input name='password' type='password' placeholder='Password' />
        </label>
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

export default withRouter(Signup)
