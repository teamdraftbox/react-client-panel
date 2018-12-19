import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'

import React, { Component } from 'react'


class showClient extends Component {
    constructor(props) {
        super(props)
        this.updateUserName = React.createRef()
        this.updateUserEmail = React.createRef()
    }
    state = {
        showUpdateName: false,
        showUpdateEmail: false,
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    nameSubmit = (e) => {
        e.preventDefault()
        const { firestore, user } = this.props
        const { updateUserName } = this.state
        let updateAmount = {
            name: updateUserName
        }
        firestore.update({ collection: 'users', doc: user.id }, updateAmount)
        console.log(this.state.updateUserName)
    }
    emailSubmit = (e) => {
        e.preventDefault()
        const { firestore, user } = this.props
        const { updateUserEmail } = this.state
        let updateAmount = {
            email: updateUserEmail
        }
        firestore.update({ collection: 'users', doc: user.id }, updateAmount)
        console.log(this.state.updateUserEmail)
    }
    render() {
        const { user } = this.props
        const { showUpdateName, showUpdateEmail } = this.state
        let balanceForm = ''
        if (showUpdateName) {
            balanceForm = (
                <form onSubmit={this.nameSubmit}>
                    <div className="input-group">
                        <input type="text"
                            placeholder="User Name"
                            onChange={this.onChange}
                            name="updateUserName"
                            ref={this.updateUserName}
                            defaultValue={user.name} />
                        <div className="input-group-append">
                            <input type="submit" value="Edit" className="btn btn-dark btn-sm" />
                        </div>
                    </div>
                </form>
            )
        } else {
            balanceForm = null
        }
        if (user) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/">
                                <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                    </Link>
                        </div>
                    </div>
                    <hr />
                    <div className="card">
                        <h2 className="card-header">{user.name}{' '}
                            <span className='text-primary'>
                                <i className="fas fa-pencil-alt" onClick={() => { this.setState({ showUpdateName: !this.state.showUpdateName }) }}></i>
                            </span>
                        </h2>
                        {balanceForm}
                        <div className='card-body'>
                            <div className='row'>
                                <div className="col-md-6 col-sm-6">
                                    <h4>  User-id:
                         <span className="text-secondary"> {user.id}</span>
                                    </h4>
                                </div>
                            </div>
                            <hr />
                            <ul className="list-group">
                                <li className="list-group-item">Phone Number  :{user.phone}</li>
                                <li className="list-group-item">email: {user.email}{' '}
                                    <span className='text-primary'>
                                        <i className="fas fa-pencil-alt" onClick={() => { this.setState({ showUpdateEmail: !this.state.showUpdateEmail }) }}></i>
                                    </span>
                                </li>
                            </ul>
                            {showUpdateEmail ? (
                                <form onSubmit={this.emailSubmit}>
                                    <div className="input-group">
                                        <input type="text"
                                            placeholder="User Email"
                                            onChange={this.onChange}
                                            name="updateUserEmail"
                                            ref={this.updateUserEmail}
                                            defaultValue={user.email} />
                                        <div className="input-group-append">
                                            <input type="submit" value="Edit" className="btn btn-dark btn-sm" />
                                        </div>
                                    </div>
                                </form>
                            ) : null}
                        </div>

                    </div>
                    {user.facebook_profile ? (
                        <div>
                            <div className='card'>
                                <h2 className='card-header'>
                                    Facebook Profile:{' '}{user.facebook_profile.name}
                                </h2>
                                <div className='card-body'>
                                    <ul className="list-group list-group-flush">
                                        <div className='row'>
                                                <div className='col-md-9'>
                                                    <strong>Email</strong>:
                                                {user.facebook_profile.email}
                                                </div>
                                                <div className='col-md-3'>
                                                    <img src={user.facebook_profile.picture.data.url} alt="Card  cap" />
                                                </div>
                                            </div>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    ) : null}
                    {user.google_profile ? (
                        <div>
                            <div className='card'>
                                <h2 className='card-header'>
                                    Google Profile:{' '}{user.google_profile.name}
                                </h2>
                                <div className='card-body'>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className='row'>
                                                <div className='col-md-9'>
                                                    <strong>Email</strong>:
                                                {user.google_profile.email}
                                                </div>
                                                <div className='col-md-3'>
                                                    <img src={user.google_profile.photo} alt="Card  cap" />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    ) : null}

                </div>
            )
        } else {
            return <Spinner />
        }

    }
}
showClient.propTypes = {
    firestore: PropTypes.object.isRequired,
}
export default compose(
    firestoreConnect(props => [
        {
            collection: 'users',
            storeAs: 'user',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        user: ordered.user && ordered.user[0]
    }))
)(showClient)

// <div className="col-md-6">
// <div className="btn-group float-right">
//     <Link to={`/client/edit/${user.id}`} className="btn btn-dark">Edit</Link>
//     <button className="btn btn-danger" onClick={this.deleteField}>delete</button>
// </div>
// </div>

// deleteField = () => {
//     const { firestore, user, history } = this.props
//     firestore.delete({ collection: 'users', doc: user.id })
//         .then(() => {
//             history.push('/')
//         })
// }