import React, { Component } from 'react'

const utils = require('../utils/utils')

import '../styles/home.css'

export default class Home extends Component {

    state = {uid: null, username: null}

    componentDidMount() {
        fetch('/api/sess')
          .then(res => res.json())
          .then(sess => this.setState({
              uid: sess.uid || null,
              username: sess.username || null
          }))
      }

    render() {
        const { uid } = this.state
        return (
            <div>
                {uid ? <HomeDash/> : <LoginPage/> }
            </div>
        )
    }
}

class LoginPage extends Component {

    state = {logBlame: '',regBlame: ''}

    constructor(){
        super()
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleLogin(e){
        e.preventDefault()
        const data = new FormData(e.target)
        fetch('/api/login', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: utils.fdToJson(data)
        })
         .then(response => {
             response.json()
               .then(result => {
                   if(!result.userValid){
                       this.setState({logBlame: "Username doesn't exist."})
                   }
                   else if(!result.pswdValid){
                       this.setState({logBlame: "Sorry, incorrect password."})
                   }
               })
         })
    }

    handleRegister(e){
        e.preventDefault()
        const data = new FormData(e.target)
        fetch('/api/login', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: utils.fdToJson(data)
        })
    }

    render(){
        const { logBlame, regBlame } = this.state
        return (
            <div id='page-wrap'>
              <h1>Login Page</h1>
              <form method="post" action="/api/register" className="auth-form">
                <h2 className="form-title">Register</h2>
                <div id="reg-blame" className="blame">{regBlame}</div>
                <input type="text" placeholder="New username" name="username" required/>
                <input type="text" placeholder="your@email.com" name="email" required/>
                <input type="text" placeholder="your@email.com (Confirm)" required/>
                <input type="password" placeholder="******" name="pswd" required/>
                <input type="password" placeholder="****** (Confirm)" required/>
                <input type="submit" value="Register"/>
              </form>
              <form method="post" onSubmit={this.handleLogin} className="auth-form">
                <h2 className="form-title">Login</h2>
                <div id="log-blame" className="blame">{logBlame}</div>
                <input type="text" placeholder="Your username" name="username" required/>
                <input type="password" placeholder="******" name="pswd" required/>
                <input type="submit" value="Login"/>
              </form>
            </div>
        )
    }
}

class HomeDash extends Component {
    render(){
        return (
            <h1>What hath God wrought?</h1>
        )
    }
}