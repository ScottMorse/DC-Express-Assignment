import React, { Component } from 'react';
import './styles/app.css';
import ReactImage from './imgs/react.png';
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './views/Home'
import Search from './views/Search'

export default class App extends Component {

  render() {
    return (
        <HashRouter basename="/">
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/search' component={Search}/>
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
