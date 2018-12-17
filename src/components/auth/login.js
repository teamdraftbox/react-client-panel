import React, { Component } from 'react'
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { compose } from 'redux'

class Login extends Component {
    state = {
        email:'',
        password:'',
    }
    onChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit = (e)=>{
        e.preventDefault() 
        const {firebase} = this.props;
        const {email,password} = this.state
        console.log({email,password})
        firebase.login({email,password})
        .catch(err=>{alert('invalid username password')})
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-md-6 mx-auto'>
                        <div className='card'>
                            <div className='card-body'>
                                <h1 className='text-center pb-4 pt-4'>
                                    <span className='text-primary'>
                                        <i className='fas fa-lock'></i>
                                        Login
                                    </span>
                                </h1>
                                <form onSubmit={this.onSubmit}>
                                    <div className='from-group'>
                                       <label htmlFor='email'>Email</label>
                                       <input type='text' 
                                       className='form-control'
                                       name='email' value={this.state.email}
                                        onChange={this.onChange}
                                        required/>
                                    </div>
                                    <div className='from-group'>
                                       <label htmlFor='password'>Password</label>
                                       <input type='password' 
                                       className='form-control'
                                       name='password' value={this.state.password}
                                        onChange={this.onChange}
                                        required/>
                                    </div>
                                    <input type="submit" value="Login" className='btn btn-primary btn-block mt-4'/>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
Login.propTypes = {
    firebase:PropTypes.object.isRequired,
}

export default firebaseConnect()(Login)