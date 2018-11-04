import React, { Component } from 'react'

const utils = require('../utils/utils')

import '../styles/orders.css'

import Header from './Header'

export default class Orders extends Component {

    state = {
        uid: null, 
        username: null, 
        email: null,
        loading: 'Loading...',
        orders: []
    }

    componentDidMount() {
        fetch('/api/sess')
          .then(res => res.json())
          .then(sess => {
            this.setState({
            uid: sess.uid || null,
            username: sess.username || null,
            email: sess.email || null,
            })
            if(!this.state.uid)
            {
            window.location.href = '/#/'
            return
            }
            fetch('/api/cart/orders',{
                method: 'POST',
                headers: {
                    'Accpet': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({uid: this.state.uid})
            })
              .then(res => res.json())
              .then(json => {
                  this.setState({orders: json})
                  if(json.length == 0){
                      this.setState({loading: 'No orders yet!'})
                  }
              })
         })
    }

    render() {
        return (
            <div id="page-wrap">
               <Header/>
                <h2>My Orders</h2>
                <OrderSummary orders={this.state.orders} loading={this.state.loading}/>
            </div>
        )
    }
}

class OrderSummary extends Component {
    render(){
        return (
            <div id="orders-wrap">
                {this.props.orders.length > 0
                ?
                this.props.orders.map((order,index) => {
                    return (
                        <div className="order" key={order.id}>
                          <div className="order-date">Order Made: {new Date(Date.parse(order.date)).toDateString()}</div>
                          <div className="order-price">Total: ${order.price}</div>
                        </div>
                    )
                }).sort((a,b) => Date.parse(a.date) < Date.parse(b.date) ? 1:-1)
                :
                this.props.loading
                }
            </div>
        )
    }
}