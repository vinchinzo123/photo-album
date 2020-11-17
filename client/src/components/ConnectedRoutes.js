import React from 'react'
import {Route} from 'react-router-dom'
import {getToken} from "../utils/functions"

const ConnectedRoutes = ({isProtected, isPublic, ...rest}) => {
  const isAuthenticated = getToken() !== "" ? true : false
  if (isProtected && isAuthenticated) {
    return (
      <Route {...rest} ></Route>
    )
  }

  if (isProtected=)
  return (
    <Route></Route>
  )
}

export default ConnectedRoutes
