import React, { useCallback, useContext } from 'react'
import { Redirect, withRouter } from 'react-router'
import { AuthContext } from '../context/Auth'

import app from '../firebaseConfig'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault()
      const { email, password } = e.target.elements

      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        alert(error.message)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h1>Log in</h1>
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

export default withRouter(Login)
