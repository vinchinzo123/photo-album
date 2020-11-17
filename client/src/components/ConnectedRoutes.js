import React from 'react'
import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../context'

const ConnectedRoutes = ({ isProtected, redirectedIfAuthenticated, component: ComponentToRender, photos, ...rest }) => {
  const [authState, dispatch] = useContext(AuthContext)
  const isAuthenticated = authState.isAuthenticated ? true : false
  if (isAuthenticated && redirectedIfAuthenticated) {
    console.log('1')
    return (
      <Route {...rest} render={routeProps => (
        <Redirect to={'/home'} {...routeProps} />
      )
      } />
    )
  }

  if (isProtected && isAuthenticated || isProtected === undefined) {
    console.log('2')
    return (
      <Route {...rest} render={(renderprops) => <ComponentToRender photos={photos} {...rest} {...renderprops} />} />
    )
  }
  console.log('3')
  return (
    <Route
      {...rest}
      render={routeProps => (
        <Redirect to={{ pathname: '/', state: { batman: routeProps.location } }} {...routeProps} />
      )} />
  )
}

export default ConnectedRoutes
