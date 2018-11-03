import React, { Component } from 'react'

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
    render(){
        return (
            <h1>Login Page</h1>
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