import React from 'react';
import {Link, NavLink} from 'react-router-dom'

const routes =  [
  <NavLink
    activeClassName="nav__link--selected"
    className="nav__link"
    to="/jobs">
    Jobs
  </NavLink>,

  <NavLink
    activeClassName="nav__link--selected"
    className="nav__link" to="/companies">
    Companies
  </NavLink>,

  <NavLink
    activeClassName="nav__link--selected"
    className="nav__link nav__link-login"
    to="/login">
    Login
  </NavLink>,

<NavLink
  activeClassName="nav__link--selected"
  className="nav__link nav__link-register"
  to="/register">
  Register
</NavLink>
]

export default class Nav extends React.Component {
  render(){
    return   <div className="navbar">
        <div>
          <a className="nav__link nav__link-home" href="/">&lt; <i className="ion-ios-home-outline"/> &gt;</a>
        </div>
        <div>
          {routesJsx}
        </div>
      </div>
  }
}
