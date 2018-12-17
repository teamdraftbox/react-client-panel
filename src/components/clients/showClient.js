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
       const {firestore,user} = this.props
       const {balanceUpdateAmount} = this.state
       let updateAmount = {
           balance:parseFloat(balanceUpdateAmount).toFixed(2)
       }
       firestore.update({collection:'users',doc:user.id},updateAmount)
       console.log(this.state.balanceUpdateAmount)
   }
   deleteField= ()=>{
       const {firestore,user,history} = this.props
       firestore.delete({collection:'users',doc:user.id})
       .then(()=>{
           history.push('/')
       })
   }
  render() {
    const {user} = this.props
    console.log(user)
    if(user){
        return (
            <div>
             <div className="row">
                <div className="col-md-6">
                    <Link to="/">
                         <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                    </Link>
                </div>
                <div className="col-md-6">
                   <div className="btn-group float-right">
                       <Link to={`/client/edit/${user.id}`} className="btn btn-dark">Edit</Link>
                     <button className="btn btn-danger" onClick={this.deleteField}>delete</button>
                   </div>
                </div>
             </div>
             <hr/>
             <div className="card">
             <h2 className="card-header">{user.name}</h2>
             <div className='card-body'>
                     <div className='row'>
                         <div className="col-md-6 col-sm-6">
                         <h4>  User-id:
                         <span className="text-secondary"> {user.id}</span>
                         </h4> 
                         </div>
                     </div>
                     <hr/>
                     <ul className="list-group">
                         <li className="list-group-item">Phone Number  :{user.phone}</li>
                         <li className="list-group-item">email: {user.email}</li>
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
            collection:'users',
            storeAs:'user',
            doc:props.match.params.id
        }
    ]),
    connect(({firestore:{ ordered }},props)=>({
        user:ordered.user && ordered.user[0]
    }))
)(showClient)


// const {showBalanceUpdate,balanceUpdateAmount} = this.state
// let balanceForm = ''
// if(showBalanceUpdate){
// balanceForm=(
//     <form onSubmit={this.balanceSubmit}>
//         <div className="input-group">
//             <input type="text" 
//             placeholder="Balance amount" 
//             onChange={this.onChange}
//             name="balanceUpdateAmount"
//             value={balanceUpdateAmount}/>
//             <div className="input-group-append">
//                 <input type="submit" value="Edit" className="btn btn-dark btn-sm"/>
//             </div>
//         </div>
//     </form>
// )
// }else{
//     balanceForm=null
// }