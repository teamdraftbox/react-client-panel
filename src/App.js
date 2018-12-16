import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from './store'
import Navbar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/layout/Dashboard'
import AddClient from './components/clients/addClient'
import ShowClient from './components/clients/showClient'
import UpdateClient from './components/clients/updateClient'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/client/add" component={AddClient} />
                <Route exact path="/client/:id" component={ShowClient} />
                <Route exact path="/client/edit/:id" component={UpdateClient} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>


    );
  }
}

export default App;
