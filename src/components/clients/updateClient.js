import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'


class updateClient extends Component {
    constructor(props){
        super(props)
        this.firstNameInput = React.createRef()
        this.lastNameInput = React.createRef()
        this.phoneInput = React.createRef()
        this.emailInput = React.createRef()
        this.balanceInput = React.createRef()

    }
    handleSubmit = (e)=>{
       e.preventDefault()
       const {firestore,client,history} =this.props
       const clientObj = {
           firstName:this.firstNameInput.current.value,
           lastName:this.lastNameInput.current.value,
           phone:this.phoneInput.current.value,
           email:this.emailInput.current.value,
           balance:this.balanceInput.current.value === ' ' ? 0 : parseFloat(this.balanceInput.current.value).toFixed(2)
       }
       firestore.update({collection:'clients',doc:client.id},clientObj)
       .then(()=>{
           history.push('/')
       })
    }
    render() {
        const { client } = this.props
        console.log(client)
        if(client){
            return (
                <div>
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <Link to={`/client/${client.id}`} className="btn btn-link">
                                    <i className="fas fa-arrow-circle-left"></i>  Back to Details
                      </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='firstname'>First Name</label>
                                    <input className='form-control'
                                        name='firstName'
                                        minLength='8'
                                        ref={this.firstNameInput}
                                        defaultValue={client.firstName} required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='lastname'>Last Name</label>
                                    <input className='form-control'
                                        name='lastName'
                                        minLength='8'
                                        ref={this.lastNameInput}
                                        defaultValue={client.lastName} required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input className='form-control'
                                        name='email'
                                        minLength='8'
                                        ref={this.emailInput}
                                        defaultValue={client.email} required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='phone'>Phone</label>
                                    <input className='form-control'
                                        name='phone'
                                        minLength='8'
                                        ref={this.phoneInput}
                                        defaultValue={client.phone} required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='balance'>balance</label>
                                    <input className='form-control'
                                        name='balance'
                                        ref={this.balanceInput}
                                        defaultValue={client.balance} required />
                                </div>
                                <input type="submit" value="Submit" className='btn btn-primary btn-block' />
                            </form>
                        </div>
                    </div>
    
                </div>
            )
             
             }else{
                 return <Spinner/>
             }
        
    }
}
updateClient.propTypes = {
    firestore: PropTypes.object.isRequired,

}
export default compose(
    firestoreConnect(props => [
        {
            collection: 'clients',
            storeAs: 'client',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(updateClient)
