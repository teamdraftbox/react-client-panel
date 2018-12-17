import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import Spinner from '../layout/Spinner'

 class Clients extends Component {
   state = {
       totalOwed:null
   }
  

  render() {
      const {users} = this.props
      if(users){
     return(
         <div className="row mt-4">
            <div className="col-md-6">
            <h2>
            <i className="fas fa-users"/>{' '}Users
            </h2>
            </div>
            <table className="table table-striped">
                <thead className="thead-inverse">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>(
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{(user.phone)}</td>
                            <td>
                                <Link to={`/client/${user.id}`} className='btn btn-secondary btn-sm'>
                                       <i className="fas fa-arrow-circle-right"></i> Details 
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
     )
      }else{
          return <Spinner/>
      }
  }
}
Clients.propTypes = {
    firestore:PropTypes.object.isRequired,
    users:PropTypes.array
}
export default compose(
    firestoreConnect([{collection:'users'}]),
    connect((state,props)=>({
        users:state.firestore.ordered.users
    }))
)(Clients)