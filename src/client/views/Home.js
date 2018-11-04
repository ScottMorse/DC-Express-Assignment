import React, { Component } from 'react'

const utils = require('../utils/utils')

import { withRouter } from 'react-router-dom'

import '../styles/home.css'

export default class Home extends Component {

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
                {uid? 
                    <HomeDash username={username} uid={uid} email={email}/> 
                    :
                    <LoginPage/> 
                }
            </div>
        )
    }
}

const emailRegex = new RegExp(	
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

const badUserNames = ["INFO","MARKETING","SALES","SUPPORT","ABUSE","NOC","SECURITY","POSTMASTER","HOSTMASTER","USENET","NEWS","WEBMASTER","WWW","UUCP","FTP","SMTP","LIST","LIST-REQUEST","admin","blog","dev","ftp","mail","pop","pop3","imap","smtp","stage","stats","status","www","beta","about","access","account","accounts","add","address","adm","admin","administration","adult","advertising","affiliate","affiliates","ajax","analytics","android","anon","anonymous","api","app","apps","archive","atom","auth","authentication","avatar","backup","banner","banners","bin","billing","blog","blogs","board","bot","bots","business","chat","cache","cadastro","calendar","campaign","careers","cgi","client","cliente","code","comercial","compare","config","connect","contact","contest","create","code","compras","css","dashboard","data","db","design","delete","demo","design","designer","dev","devel","dir","directory","doc","docs","domain","download","downloads","edit","editor","email","ecommerce","forum","forums","faq","favorite","feed","feedback","flog","follow","file","files","free","ftp","gadget","gadgets","games","guest","group","groups","help","home","homepage","host","hosting","hostname","html","http","httpd","https","hpg","info","information","image","img","images","imap","index","invite","intranet","indice","ipad","iphone","irc","java","javascript","job","jobs","js","knowledgebase","log","login","logs","logout","list","lists","mail","mail1","mail2","mail3","mail4","mail5","mailer","mailing","mx","manager","marketing","master","me","media","message","microblog","microblogs","mine","mp3","msg","msn","mysql","messenger","mob","mobile","movie","movies","music","musicas","my","name","named","net","network","new","news","newsletter","nick","nickname","notes","noticias","ns","ns1","ns2","ns3","ns4","ns5","ns6","ns7","ns8","ns9","ns10","old","online","operator","order","orders","page","pager","pages","panel","password","perl","pic","pics","photo","photos","photoalbum","php","plugin","plugins","pop","pop3","post","postmaster","postfix","posts","profile","project","projects","promo","pub","public","python","random","register","registration","root","ruby","rss","sale","sales","sample","samples","script","scripts","secure","send","service","shop","sql","signup","signin","search","security","settings","setting","setup","site","sites","sitemap","smtp","soporte","ssh","stage","staging","start","subscribe","subdomain","suporte","support","stat","static","stats","status","store","stores","system","tablet","tablets","tech","telnet","test","test1","test2","test3","teste","tests","theme","themes","tmp","todo","task","tasks","tools","tv","talk","update","upload","url","user","username","usuario","usage","vendas","video","videos","visitor","win","ww","www","www1","www2","www3","www4","www5","www6","www7","wwww","wws","wwws","web","webmail","website","websites","webmaster","workshop","xxx","xpg","you","yourname","yourusername","yoursite","yourdomain","about","access","account","accounts","add","address","adm","admin","administration","adult","advertising","affiliate","affiliates","ajax","analytics","android","anon","anonymous","api","app","apps","archive","atom","auth","authentication","avatar","backup","banner","banners","bin","billing","blog","blogs","board","bot","bots","business","chat","cache","cadastro","calendar","campaign","careers","cgi","client","cliente","code","comercial","compare","config","connect","contact","contest","create","code","compras","css","dashboard","data","db","design","delete","demo","design","designer","dev","devel","dir","directory","doc","docs","domain","download","downloads","edit","editor","email","ecommerce","forum","forums","faq","favorite","feed","feedback","flog","follow","file","files","free","ftp","gadget","gadgets","games","guest","group","groups","help","home","homepage","host","hosting","hostname","html","http","httpd","https","hpg","info","information","image","img","images","imap","index","invite","intranet","indice","ipad","iphone","irc","java","javascript","job","jobs","js","knowledgebase","log","login","logs","logout","list","lists","mail","mail1","mail2","mail3","mail4","mail5","mailer","mailing","mx","manager","marketing","master","me","media","message","microblog","microblogs","mine","mp3","msg","msn","mysql","messenger","mob","mobile","movie","movies","music","musicas","my","name","named","net","network","new","news","newsletter","nick","nickname","notes","noticias","ns","ns1","ns2","ns3","ns4","old","online","operator","order","orders","page","pager","pages","panel","password","perl","pic","pics","photo","photos","photoalbum","php","plugin","plugins","pop","pop3","post","postmaster","postfix","posts","profile","project","projects","promo","pub","public","python","random","register","registration","root","ruby","rss","sale","sales","sample","samples","script","scripts","secure","send","service","shop","sql","signup","signin","search","security","settings","setting","setup","site","sites","sitemap","smtp","soporte","ssh","stage","staging","start","subscribe","subdomain","suporte","support","stat","static","stats","status","store","stores","system","tablet","tablets","tech","telnet","test","test1","test2","test3","teste","tests","theme","themes","tmp","todo","task","tasks","tools","tv","talk","update","upload","url","user","username","usuario","usage","vendas","video","videos","visitor","win","ww","www","www1","www2","www3","www4","www5","www6","www7","wwww","wws","wwws","web","webmail","website","websites","webmaster","workshop","xxx","xpg","you","yourname","yourusername","yoursite","yourdomain","supportdetails","support-details","stacks","imulus","github","twitter","facebook","google","apple","about","account","activate","add","admin","administrator","api","app","apps","archive","archives","auth","blog","cache","cancel","careers","cart","changelog","checkout","codereview","compare","config","configuration","connect","contact","create","delete","direct_messages","documentation","download","downloads","edit","email","employment","enterprise","faq","favorites","feed","feedback","feeds","fleet","fleets","follow","followers","following","friend","friends","gist","group","groups","help","home","hosting","hostmaster","idea","ideas","index","info","invitations","invite","is","it","job","jobs","json","language","languages","lists","login","logout","logs","mail","map","maps","mine","mis","news","oauth","oauth_clients","offers","openid","order","orders","organizations","plans","popular","post","postmaster","privacy","projects","put","recruitment","register","remove","replies","root","rss","sales","save","search","security","sessions","settings","shop","signup","sitemap","ssl","ssladmin","ssladministrator","sslwebmaster","status","stories","styleguide","subscribe","subscriptions","support","sysadmin","sysadministrator","terms","tour","translations","trends","unfollow","unsubscribe","update","url","user","weather","webmaster","widget","widgets","wiki","ww","www","wwww","xfn","xml","xmpp","yaml","yml","chinese ","mandarin ","spanish ","english ","bengali ","hindi ","portuguese ","russian ","japanese ","german ","wu ","javanese ","korean ","french ","vietnamese ","telugu ","chinese ","marathi ","tamil ","turkish ","urdu ","min-nan ","jinyu ","gujarati ","polish ","arabic ","ukrainian ","italian ","xiang ","malayalam ","hakka ","kannada ","oriya ","panjabi ","sunda ","panjabi ","romanian ","bhojpuri ","azerbaijani ","farsi ","maithili ","hausa ","arabic ","burmese ","serbo-croatian ","gan ","awadhi ","thai ","dutch ","yoruba ","sindhi"]

class LoginPage extends Component {

    state = {logBlame: '',regBlame: '',loading: ''}

    constructor(){
        super()
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleLogin(e){
        e.preventDefault()
        this.setState({logBlame: ''})
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
                   else{
                        window.location.reload()
                   }
               })
         })
    }

    handleRegister(e){
        e.preventDefault()
        const data = new FormData(e.target)
        this.setState({regBlame: ""})
        if(data.get('email') != data.get('cemail')){
            this.setState({regBlame: "Emails don't match."})
        }
        else if(data.get('pswd') != data.get('cpswd')){
            this.setState({regBlame: "Passwords don't match."})
        }
        else if(data.get('pswd').length < 6){
            this.setState({regBlame: "Password is too short."})
        }
        else if(data.get('username').length < 4){
            this.setState({regBlame: "Username too short."})
        }
        else if(badUserNames.includes(data.get('username'))){
            this.setState({regBlame: "Username is not available."})
        }
        else if(!data.get('email').match(emailRegex)){
            this.setState({regBlame: "Invalid email address."})
        }
        else{
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: utils.fdToJson(data)
            })
              .then(response =>
                response.json())
                .then(result => {
                    if(!result.userValid){
                      this.setState({regBlame: "Username not available."})
                    }
                    else if(!result.emailValid){
                      this.setState({regBlame: "Email address already in use."})
                    }
                    else{
                        window.location.reload()
                    }
                })
        }
    }

    render(){
        const { logBlame, regBlame, loading } = this.state
        return (
            <div id='page-wrap'>
              <h1>Login Page</h1>
              <div>{loading}</div>
              <form method="post" onSubmit={this.handleRegister} className="auth-form">
                <h2 className="form-title">Register</h2>
                <div id="reg-blame" className="blame">{regBlame}</div>
                <input type="text" placeholder="New username" name="username" required/>
                <input type="text" placeholder="your@email.com" name="email" required/>
                <input type="text" placeholder="your@email.com (Confirm)" name="cemail" required/>
                <input type="password" placeholder="******" name="pswd" required/>
                <input type="password" placeholder="****** (Confirm)" name="cpswd" required/>
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

    state = {}

    constructor(){
        super()
        this.handleLogout = this.handleLogout.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleLogout(){
        fetch('/api/logout',{method:'POST'})
          .then(response => {
              window.location.reload()
          })
    }

    handleSearch(e){
        e.preventDefault()
        const data = new FormData(e.target)
        window.location.href = '#/search?q=' + data.get('query')
    }

    render(){
        return (
            <div id="page-wrap">
                <h1>Welcome, {this.props.username}!</h1>
                <form onSubmit={this.handleLogout}>
                    <input type="submit" value="Logout"/>
                </form>
                <div>
                <form onSubmit={this.handleSearch}>
                    <input type="search" placeholder="Search our products" name="query"/>
                    <input type="submit" value="Search"/>
                </form>
                </div>
            </div>
        )
    }
}