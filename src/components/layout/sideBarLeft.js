
import { Link } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { compose } from 'redux'
import React, { Component } from 'react'

class sideBarLeft extends Component {
    state = {
        isAuthenticated: false
      }
      static getDerivedStateFromProps(props, state) {
        const { auth } = props
        if (auth.uid) {
          return {
            isAuthenticated: true
          }
        } else {
          return {
            isAuthenticated: false
          }
        }
      }
    render() {
        const { isAuthenticated } = this.state
        if(isAuthenticated){
            return(
                <div className="h-100">
                    <nav className="bg-secondary sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active" >
                                        <span data-feather="home" className='text-white'>
                                        Users <span className="sr-only"></span>
                                        </span>
                                      
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link  to="/deal" className="nav-link active" >
                                        <span data-feather="home" className='text-white'>
                                        Deals <span className="sr-only"></span>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )
        }else{
            return null
        }
    }
}
export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(sideBarLeft)
