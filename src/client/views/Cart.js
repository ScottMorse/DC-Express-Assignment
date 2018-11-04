import React, { Component } from 'react'

const utils = require('../utils/utils')

import '../styles/cart.css'

import Header from './Header'

export default class Cart extends Component {

    render(){
        return (
            <div id="page-wrap">
               <Header/>
                <h2>My Cart:</h2>
                <a id="checkout" href="/#/checkout">Checkout</a>
                <Products/>
            </div>
        )
    }
}

class Products extends Component {

    state = {uid: null, username: null, email: null, products: [], loading:'Loading...'}

    constructor(){
        super()
        this.removeFromCart = this.removeFromCart.bind(this)
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

    removeFromCart(e){
        const prodId = e.target.parentElement.dataset.key
        fetch('/api/cart/removeFromCart',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uid: this.state.uid, prodId: prodId}) 
        })
            .then(res => {
            window.location.reload()
        })
    }
    
    render(){
        return (
            <div id="products">
              {
                this.state.products.length > 0
                ?
                this.state.products.map(product => {
                    return ( 
                    <div className="product" key={product.id} data-key={product.id}>
                      <div className="prod-img" style={{backgroundImage:'url(' + product.imgurl + ')'}}></div>
                      <h3 className="prod-title">{product.name}</h3>
                      <div className="prod-price">${product.price}</div>
                      <button className="rem-cart" onClick={this.removeFromCart}>Remove From Cart</button>
                    </div>
                    )
                })
                :
                <div id="no-products">{this.state.loading}</div>
              }
            </div>
        )
    }
}