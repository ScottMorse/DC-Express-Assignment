import React, { Component } from 'react';
import './styles/app.css';
import ReactImage from './imgs/react.png';
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './views/Home'
import Search from './views/Search'
import Cart from './views/Cart'
import Checkout from './views/Checkout'
import Orders from './views/Orders'

export default class App extends Component {

  render() {
    return (    
        <HashRouter basename="/">
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/search' component={Search}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders}/>
          </Switch>
        </HashRouter>
    )

    // const { username } = this.state;
    // return (
    //   <div>
    //     {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
    //     <img src={ReactImage} alt="react" />
    //   </div>
    // );

  }
}
