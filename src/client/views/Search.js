import React, { Component } from 'react'

const utils = require('../utils/utils')

import '../styles/search.css'

export default class Search extends Component {
    state = {uid: null, username: null, email: null}

    componentDidMount() {
        fetch('/api/sess')
          .then(res => res.json())
          .then(sess => this.setState({
              uid: sess.uid || null,
              username: sess.username || null,
              email: sess.email || null
          }))
      }

    render() {
        const { uid,username,email } = this.state
        return (
            <div>
                What hath God wrought?
            </div>
        )
    }
}