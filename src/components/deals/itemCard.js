import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'
class ItemCard extends Component {
  render() {
    const {deal} = this.props
    let {index} = this.props
    if (deal) {
      if(index !== 0 ){
        index--
      }
      return (
        <div>
            <div className='card'>
              <h1 className='card-header'>
                <span className='text-primary'>
                  <i className="fas fa-cart-arrow-down"></i>
                </span>{' '}
                Items Details
              </h1>
              <img className="card-img-top" height="220" src={deal.items[index].imageList[0].uri} alt="Card  cap"></img>
              <div className='card-body'>
                <h3>Item Name : {deal.items[index].itemName}</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong> Category </strong>
                    :
                    {deal.items[index].category}
                  </li>
                  <li className="list-group-item">
                    <strong> Weight </strong>
                    :
                    {deal.items[index].weight}{' '}{deal.items[index].measurement}</li>
                  <li className="list-group-item">
                    <strong> Quantity </strong>
                    :
                    {deal.items[index].quantity}</li>
                  <li className="list-group-item">
                    <strong>Value </strong>
                    :Rs{' '}
                    {deal.items[index].value}/-</li>
                </ul>
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
      doc: props.params
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    deal: ordered.deal && ordered.deal[0]
  }))
)(ItemCard)
