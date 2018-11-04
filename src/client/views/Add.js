import React, { Component } from 'react'

const utils = require('../utils/utils')

export default class Add extends Component {

    constructor(){
        super()
        this.add = this.add.bind(this)
    }

    add(e){
        e.preventDefault()
        const data = new FormData(e.target)
        fetch('/api/add', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: utils.fdToJson(data)
        })
    }

    render(){
        return (
            <form onSubmit={this.add}>
                <input type="text" placeholder="name" name="name"/>
                <input type="text" placeholder="cat" name="category"/>
                <input type="text" placeholder="url" name="imageurl"/>
                <input type="text"  placeholder="price" name="price"/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}