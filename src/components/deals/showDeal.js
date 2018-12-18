import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'


class ShowDeal extends Component {
    render() {
        const { deal } = this.props
        if (deal) {
            return (
                <div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='card mt-4'>
                                <h2 className="card-header">
                                    <span className='text-primary'>
                                        <i className="fas fa-arrow-alt-circle-right"></i>
                                    </span>
                                    {' '}Sender Details:
                                </h2>
                                <div className='card-body'>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong> Name </strong>
                                            :
                                  {deal.sender_details.name}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>City </strong>
                                            : {deal.sender_details.city}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>
                                                Contact
                                </strong>
                                            : {deal.sender_details.phone}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='card mt-4'>
                                <h2 className="card-header">
                                    <span className='text-primary'>
                                        <i className="fas fa-arrow-alt-circle-left"></i>
                                    </span>
                                    {' '}Receiver Details:
                                </h2>
                                <div className='card-body'>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong> Name </strong>
                                            :
                                  {deal.receiver_details.name}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>City </strong>
                                            : {deal.receiver_details.city}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>
                                                Contact
                                </strong>
                                            : {deal.receiver_details.phone}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='card mt-4'>
                                <h2 className="card-header">
                                    <span className='text-primary'>
                                        <i className="fas fa-home"></i>
                                    </span>
                                    {' '}Pickup Address:
                                </h2>
                                <div className='card-body'>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong> Address </strong>
                                            :
                                  {deal.pickup_address}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='card mt-4'>
                                <h2 className="card-header">
                                    <span className='text-primary'>
                                        <i className="fas fa-home"></i>
                                    </span>
                                    {' '}Drop Address:
                               </h2>
                                <div className='card-body'>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong> Address </strong>
                                            :
                                  {deal.drop_address}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Spinner />
        }
    }
}
export default compose(
    firestoreConnect(props => [
        {
            collection: 'deals',
            storeAs: 'deal',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        deal: ordered.deal && ordered.deal[0]
    }))
)(ShowDeal)