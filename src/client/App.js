import React, { Component } from 'react';
import './styles/app.css';
import ReactImage from './imgs/react.png';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './views/Home'

export default class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Home}/>
          </Switch>
        </BrowserRouter>
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
