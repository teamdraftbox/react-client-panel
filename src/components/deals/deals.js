import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import Spinner from '../layout/Spinner'
 class Deals extends Component {
  render() {
    const {deals} = this.props
  
    if(deals){
      return(
          <div className="row mt-4">
             <div className="col-md-6">
             <h2>
             <i className="fas fa-shipping-fast"></i>{' '}Deals
             </h2>
             </div>
             <table className="table table-striped">
                 <thead className="thead-inverse">
                     <tr>
                         <th>Name</th>
                         <th>Contact</th>
                         <th>Pickup Address</th>
                         <th>Drop Address</th>
                         <th/>
                     </tr>
                 </thead>
                 <tbody>
                     {deals.map(deal=>(
                         <tr key={deal.id}>
                             <td>{deal.delivery_assistance.name}</td>
                             <td>{deal.delivery_assistance.phone}</td>
                             <td>{(deal.pickup_address)}</td>
                             <td>{(deal.drop_address)}</td>
                             <td>
                                 <Link to={`/deal/${deal.id}/detail`} className='btn btn-secondary btn-sm'>
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
Deals.propTypes = {
  firestore:PropTypes.object.isRequired,
  users:PropTypes.array
}

export default compose(
  firestoreConnect([{collection:'deals'}]),
  connect((state,props)=>({
      deals:state.firestore.ordered.deals
  }))
)(Deals)