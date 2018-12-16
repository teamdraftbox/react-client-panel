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
      const {clients} = this.props
      if(clients){
     return(
         <div className="row">
            <div className="col-md-6">
            <h2>
            <i className="fas fa-users"/>{' '}Clients
            </h2>
            </div>
            <div className="col-md-6">
            <h2>$ 500.00</h2>
            </div>
            <table className="table table-striped">
                <thead className="thead-inverse">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client=>(
                        <tr key={client.id}>
                            <td>{client.firstName} {client.lastName}</td>
                            <td>{client.email}</td>
                            <td>${(client.balance)}</td>
                            <td>
                                <Link to={`/client/${client.id}`} className='btn btn-secondary btn-sm'>
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
    clients:PropTypes.array
}
export default compose(
    firestoreConnect([{collection:'clients'}]),
    connect((state,props)=>({
        clients:state.firestore.ordered.clients  
    }))
)(Clients)