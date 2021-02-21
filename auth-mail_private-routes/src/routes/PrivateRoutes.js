import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/Auth'

const PrivateRoutes = ({ component: RouteComponent, ...props }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route
      {...props}
      render={(routeProps) => (!!currentUser ? <RouteComponent {...routeProps} /> : <Redirect to='/login' />)}
    />
  )
}

export default PrivateRoutes
