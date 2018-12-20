import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import classnames from 'classnames'
import Spinner from '../layout/Spinner'
import ItemCard from './itemCard'

class Items extends Component {
    state = {
        index:0,
        canShow:true
    }
    handleClick = (e)=>{
     this.setState({
         index:e.currentTarget.dataset.id
     })
     this.openCity(e)
    }
    openCity(evt) {
        // Declare all variables
        let tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        evt.currentTarget.className += " active";
      }
    render() {
        const { deal } = this.props
        let {index} = this.state
        var i = 0
        var canShow = false
        if (deal) {
            return (
                <div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className="card">
                                <div className="card-header">
                                    Items List
                                </div>
                                <ul className="list-group list-group-flush">
                                    {deal.items.map((item) =>{
                                     i++
                                     canShow = !canShow
                                       return (<li key={item.itemName} onClick={this.handleClick.bind(this)} data-id={i} className={classnames("list-group-item tablinks",{
                                           'active':canShow
                                       })}>
                                            Item{i}
                                        </li>)
                                    }
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className='col-md-6'>
                           <ItemCard index={index} params={this.props.match.params.id}/>
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
)(Items)