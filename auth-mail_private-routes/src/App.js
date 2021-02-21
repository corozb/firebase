import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AuthProvider } from './context/Auth'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import PrivateRoutes from './routes/PrivateRoutes'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Switch>
            <PrivateRoutes exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
