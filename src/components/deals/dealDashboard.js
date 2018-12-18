
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'
import BasicDetails from './showDeal'

class dealDashboard extends Component {
    render() {
       const {pathname} =  this.props.location
        const { deal } = this.props
        if (deal && pathname === `/deal/${deal.id}`) {
            return (
                <div>
                    <Router>
                        <div>
                            <div>
                                <ul className="nav nav-pills">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/deal/${deal.id}/detail`}>Basic Details</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/deal/${deal.id}/item`}>Items</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/deal/${deal.id}/status`}>Status</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Switch>
                                    <Route exact path="/deal/:id/detail" component={BasicDetails} />
                                    <Route exact path="/deal/:id/item" component={BasicDetails} />
                                    <Route exact path="/deal/:id/status" component={BasicDetails} />
                                </Switch>
                            </div>
                        </div>
                    </Router>
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
)(dealDashboard)

