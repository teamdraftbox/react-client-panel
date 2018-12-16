import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import Spinner from '../layout/Spinner'

import React, { Component } from 'react'

class showClient extends Component {
  render() {
    const {client} = this.props
    console.log(client)
    if(client){
        return (
            <div>
             <div className="row">
                <div className="col-md-6">
                    <Link to="/">
                         <i className="fas fa-arrow-circle-left"></i>
                         Back to Dashboard
                    </Link>
                </div>
                <div className="col-md-6">
                   <div className="btn-group float-right">
                       <Link to={`/client/edit/${client.id}`} className="btn btn-dark">Edit</Link>
                     <button className="btn btn-danger">delete</button>
                   </div>
                </div>
             </div>
             <hr/>
             <div className="card">
             <h2 class="card-header">{client.firstName} {client.lastName}</h2>
             <div className='card-body'>
                     <div className='row'>
                         <div className="col-md-6 col-sm-6">
                         <h4>  Client-id:
                         <span className="text-secondary"> {client.id}</span>
                         </h4> 
                         </div>
                         <div className="col-md-6 col-sm-6">
                             <h3 className="pull-right">
                                 Balance:${' '}
                                {parseFloat(client.balance).toFixed(2)}
                             </h3>
                         </div>
                     </div>
                     <hr/>
                     <ul className="list-group">
                         <li className="list-group-item">Phone Number  :{client.phone}</li>
                         <li className="list-group-item">email: {client.email}</li>
                     </ul>
             </div>
                 
             </div>
            </div>
          )
    }else{
        return <Spinner />
    }
    
  }
}
showClient.propTypes = {
    firestore:PropTypes.object.isRequired,
}
export default compose(
    firestoreConnect(props=>[
        {
            collection:'clients',
            storeAs:'client',
            doc:props.match.params.id
        }
    ]),
    connect(({firestore:{ ordered }},props)=>({
        client:ordered.client && ordered.client[0]
    }))
)(showClient)
