import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'

class Items extends Component {
  render() {
    const {deal}=this.props
    if(deal){
        return (
            <div>
              <h1>hai status</h1>
            </div>
          )
    }else{
        return <Spinner/>
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