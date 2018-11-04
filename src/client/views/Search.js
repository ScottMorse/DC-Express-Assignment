import React, { Component } from 'react'

const utils = require('../utils/utils')

import '../styles/search.css'

import Header from './Header'

import queryString from 'query-string'

export default class Search extends Component {
    state = {query: queryString.parse(this.props.location.search)}

    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(e){
        e.preventDefault()
        const data = new FormData(e.target)
        window.location.href = '#/search?q=' + data.get('query')
        window.location.reload()
    }

    render() {
        const { uid,username,email,query } = this.state
        return (
            <div id="page-wrap">
                <Header/>
                <form onSubmit={this.handleSearch}>
                    <input type="search" placeholder="Search our products" name="query"/>
                    <input type="submit" value="Search"/>
                </form>
                <Products query={this.state.query}/>
            </div>
        )
    }
}

class Products extends Component {

    state = {uid: '',username: '', email: '',results: [], itemsAdded: [], loading: 'Loading...'}

    constructor(props){
        super(props)
        this.addToCart = this.addToCart.bind(this)
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
              window.location.href = '/#/'
              return
          }
        })
        fetch('/api/search',{
            method:"post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query:this.props.query})
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            if(json.results.length == 0){
                this.setState({loading: 'No products found!'})
            }
            this.setState({results: json.results})
        })
    }

    addToCart(e){
        e.persist()
        const prodId = e.target.parentElement.parentElement.dataset.key
        let itemsAdded = this.state.itemsAdded.slice()
        if(!itemsAdded.includes(prodId)){
            fetch('/api/cart/addToCart',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({uid: this.state.uid, prodId: prodId}) 
            })
              .then(res => {
                e.target.innerHTML = 'Added to Cart!'
                itemsAdded.push(prodId)
                this.setState({itemsAdded: itemsAdded})
            })
        }
    }

    render() {
        return (
            <div id="products">
              {
                this.state.results.length > 0
                ?
                this.state.results.map(product => {
                    return (
                    <div className="product" key={product.id} data-key={product.id}>
                      <div className="prod-img" style={{backgroundImage:'url(' + product.imgurl + ')'}}></div>
                      <div className="details-wrap">
                        <h3 className="prod-title">{product.name}</h3>
                        <div className="prod-price">${product.price}</div>
                        <button className="add-cart" onClick={this.addToCart}>Add to Cart</button>
                      </div>
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