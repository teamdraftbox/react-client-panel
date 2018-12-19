import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'

class Items extends Component {
    render() {
        const { deal } = this.props
        console.log(deal)
        if (deal) {
            return (
                <div>
                    <div className='row'>
                        {deal.items.map((item) => (
                            <div key={item.itemName} className='card mt-4 col-md-6'>
                                <h1 className='card-header'>
                                    <span className='text-primary'>
                                        <i className="fas fa-cart-arrow-down"></i>
                                    </span>{' '}
                                    Items Details
                                </h1>
                                <img className="card-img-top" height="250" src={item.imageList[0].uri} alt="Card  cap"></img>
                                <div className='card-body'>
                                    <h3>Item Name : {item.itemName}</h3>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                        <strong> Category </strong>
                                            :
                                        {item.category}
                                        </li>
                                        <li className="list-group-item">
                                        <strong> Weight </strong>
                                            :
                                        {item.weight}{' '}{item.measurement}</li>
                                        <li className="list-group-item">
                                        <strong> Quantity </strong>
                                            :
                                        {item.quantity}</li>
                                        <li className="list-group-item">
                                        <strong>Value </strong>
                                        :Rs{' '}
                                        {item.value}/-</li>
                                    </ul>
                                </div>
                            </div>
                        ))}

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
)(Items)