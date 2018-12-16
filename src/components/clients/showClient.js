import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import Spinner from '../layout/Spinner'

import React, { Component } from 'react'


class showClient extends Component {
   state = {
       showBalanceUpdate :false,
       balanceUpdateAmount :''
   }
   onChange = (e)=>{
       this.setState({
        [e.target.name] : e.target.value
       })
   }
   balanceSubmit = (e)=>{
       e.preventDefault()
       const {firestore,client} = this.props
       const {balanceUpdateAmount} = this.state
       let updateAmount = {
           balance:parseFloat(balanceUpdateAmount).toFixed(2)
       }
       firestore.update({collection:'clients',doc:client.id},updateAmount)
       console.log(this.state.balanceUpdateAmount)
   }
   deleteField= ()=>{
       const {firestore,client,history} = this.props
       firestore.delete({collection:'clients',doc:client.id})
       .then(()=>{
           history.push('/')
       })
   }
  render() {
    const {showBalanceUpdate,balanceUpdateAmount} = this.state
    let balanceForm = ''
    if(showBalanceUpdate){
    balanceForm=(
        <form onSubmit={this.balanceSubmit}>
            <div className="input-group">
                <input type="text" 
                placeholder="Balance amount" 
                onChange={this.onChange}
                name="balanceUpdateAmount"
                value={balanceUpdateAmount}/>
                <div className="input-group-append">
                    <input type="submit" value="Edit" className="btn btn-dark btn-sm"/>
                </div>
            </div>
        </form>
    )
    }else{
        balanceForm=null
    }
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
                     <button className="btn btn-danger" onClick={this.deleteField}>delete</button>
                   </div>
                </div>
             </div>
             <hr/>
             <div className="card">
             <h2 className="card-header">{client.firstName} {client.lastName}</h2>
             <div className='card-body'>
                     <div className='row'>
                         <div className="col-md-6 col-sm-6">
                         <h4>  Client-id:
                         <span className="text-secondary"> {client.id}</span>
                         </h4> 
                         </div>
                         <div className="col-md-6 col-sm-6">
                             <h3 className="pull-right">
                             <span>
                             Balance:${' '}
                                {parseFloat(client.balance).toFixed(2)}
                             </span>
                              <small>
                                  <a href="#!" onClick={()=>{this.setState({showBalanceUpdate:!this.state.showBalanceUpdate})}}>
                                      <i className="fas fa-pencil-alt"></i>
                                  </a>
                              </small>
                             </h3>
                             {balanceForm}
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
