import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        phone: '',
        balance: '',
        email: ''
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const newClient = this.state
        const { firestore, history } = this.props
        if (newClient.balance === '') {
            newClient.balance = 0
        }
        firestore.add({ collection: 'clients' }, newClient)
            .then(() => {
                history.push("/")
            })
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i>  Back to Dashboard
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
                                onChange={this.onChange}
                                value={this.state.firstName} required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='lastname'>Last Name</label>
                            <input className='form-control'
                                name='lastName'
                                minLength='8'
                                onChange={this.onChange}
                                value={this.state.lastName} required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input className='form-control'
                                name='email'
                                minLength='8'
                                onChange={this.onChange}
                                value={this.state.email} required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='phone'>Phone</label>
                            <input className='form-control'
                                name='phone'
                                minLength='8'
                                onChange={this.onChange}
                                value={this.state.phone} required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='balance'>balance</label>
                            <input className='form-control'
                                name='balance'
                                onChange={this.onChange}
                                value={this.state.balance} required />
                        </div>
                        <input type="submit" value="Submit" className='btn btn-primary btn-block' />
                    </form>
                </div>
            </div>


        )
    }
}
AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,

}
export default firestoreConnect()(AddClient)