import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class AppNavbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">Client Panel</Link>
          <button className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain">
            <span className="navbar-toggle-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"></li>
              <Link to="/" className="nav-link"> Dashboard</Link>
            </ul>
          </div>
        </div>
        </nav>
      
      </div>
    )
  }
}
export default AppNavbar