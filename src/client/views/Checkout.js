import React, { Component } from 'react'

const utils = require('../utils/utils')

import '../styles/cart.css'

import Header from './Header'

export default class Checkout extends Component {
    render(){
        return (
            <div id="page-wrap">
                <Header/>
                <div>Hello</div>
                <Summary/>
            </div>
        )
    }
}

class Summary extends Component {
    state = {
        uid: null, 
        username: null, 
        email: null, 
        address: {
            name: '',
            street: '',
            city: '',
            zip: ''
        }, products: [], 
        loading:'Loading...'}

    constructor(){
        super()
        this.placeOrder = this.placeOrder.bind(this)
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
            if(!sess.uid){
                window.location.href =" /#/"
                return
            }
            fetch('/api/address',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({uid: this.state.uid})
            })
              .then(res => res.json())
              .then(json => {
                  this.setState({address: {
                      name: json.name,
                      street: json.street,
                      city: json.city,
                      zip: json.zip
                  }})
              })
            fetch('/api/cart',{
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({uid: this.state.uid})
            })
              .then(res => {
                  return res.json()
              })
              .then(json => {
                const products = json.results
                  if(products.length == 0)
                  {
                    this.setState({loading: 'Nothing here yet!'})
                  }
                  else{
                    this.setState({products: products})
                  }
              })
        })
    }

    placeOrder(){
        fetch('/api/cart/placeOrder',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uid:this.state.uid,price: this.state.products.reduce(
                (total,prod) => {
                    return total + prod.price
            },0)})
        })
          .then(res => {
              window.location.href = '/#/orders'
          })
    }

    render() {
        return (
            <div id="summary">
              <h2>My Order</h2>
              {this.state.products.length > 0
                ?
                 this.state.products.map((product,index) => {
                     return (
                        <div className="prod-summary" key={product.id}>
                            <div className="prod-name">{index + 1}: {product.name}</div>
                            <div className="prod-price">${product.price}</div>
                        </div>
                     )
                 })
                :
                 <div id="loading">{this.state.loading}</div>
              }
              {this.state.products.length > 0
               ?
               <div id="bottom-wrap">
                    <div id="totals">
                        <div id="total-num">Number of Items: {this.state.products.length}</div>
                        <div id="total-price">Total: ${this.state.products.reduce(
                            (total,prod) => {
                                return total + prod.price
                        },0)}</div>
                        <button onClick={this.placeOrder}>Place Order</button>
                    </div>
                    <div id="shipping">
                      <h2 id="ship-title">Shipping To:</h2>
                      <div id="ship-name">{this.state.address.name}</div>
                      <div id="ship-street">{this.state.address.street}</div>
                      <div id="ship-city">{this.state.address.city} {this.state.address.zip}</div>
                    </div>
               </div>
                :
                <div></div>
               }
            </div>
        )
    }
}