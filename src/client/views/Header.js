import React, { Component } from 'react'

const utils = require('../utils/utils')

import '../styles/header.css'

export default class Header extends Component {
    render(){
        return (
            <div id="header">
              <h1>Express Electronics</h1>
                <div id="nav">
                <a id="home-link" href="/">Home</a>
                <a id="cart-link" href="/#/cart">My Cart</a>
                <a id="orders-link" href="/#/orders">My Orders</a>
                <form onSubmit={utils.handleLogout}>
                    <input id="logout" type="submit" value="Logout"/>
                </form>
                </div>
            </div>
        )
    }
}