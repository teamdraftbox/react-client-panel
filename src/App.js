import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from './store'
import Navbar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserIsNotAuthenticated, UserIsAuthenticated } from './helper/auth'
import Dashboard from './components/layout/Dashboard'
import AddClient from './components/clients/addClient'
import ShowClient from './components/clients/showClient'
import UpdateClient from './components/clients/updateClient'
import SidebarLeft from './components/layout/sideBarLeft'
import showDeal from './components/deals/dealDashboard'
import Login from './components/auth/login'
import Deal from './components/deals/deals';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className='row'>
            <div className='col-sm-2 col-xs-2  col-md-2 col-lg-2'>
              <SidebarLeft />
            </div>
            <div className='col-sm-10 col-xs-10  col-md-10 col-lg-10'>
              <div className="container">
                <Switch>
                  <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
                  <Route exact path="/user/add" component={UserIsAuthenticated(AddClient)} />
                  <Route exact path="/user/:id" component={UserIsAuthenticated(ShowClient)} />
                  <Route exact path="/user/edit/:id" component={UserIsAuthenticated(UpdateClient)} />
                  <Route exact path="/deal" component={UserIsAuthenticated(Deal)} />
                  <Route exact path="/deal/:id" component={UserIsAuthenticated(showDeal)} />
                  <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                </Switch>
              </div>
            </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
