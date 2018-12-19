
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React, { Component } from 'react'
import { connect,Provider } from 'react-redux'
import { compose } from 'redux'
import { UserIsAuthenticated } from '../../helper/auth'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'
import BasicDetails from './basicDetails'
import Items from './items'
import Status from './status'
import store from '../../store'
class dealDashboard extends Component {
    state = {
        canShow: false
    }
    static getDerivedStateFromProps(props, state) {
        const { pathname } = props.location
        const sub = pathname.slice(1, 5)
        if (sub === 'deal') {
            return {
                canShow: true
            }
        } else {
            return {
                canShow: false
            }
        }
    }
    render() {
        const { deal } = this.props
        const { canShow } = this.state
        if (deal && canShow) {
            return (
                <Provider store={store}>
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
                                        <Route exact path="/deal/:id/detail" component={UserIsAuthenticated(BasicDetails)} />
                                        <Route exact path="/deal/:id/item" component={UserIsAuthenticated(Items)} />
                                        <Route exact path="/deal/:id/status" component={UserIsAuthenticated(Status)} />
                                    </Switch>
                                </div>
                            </div>
                        </Router>
                    </div>
                </Provider>

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

