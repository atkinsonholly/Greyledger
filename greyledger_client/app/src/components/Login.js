import React from 'react'

const Login = (props) => {
    return (
        <div className="login-container">
          <div className="login-logo-container">
              <img className="login-logo" src="" alt="logo"></img>
          </div>
          <p></p>
          <form onSubmit={props.login}>
              <div className="username-container">
                  <input type="text" className="email-input" placeholder="Email" name="email" value={props.logininfo.email} onChange={props.handleChange} />
              </div>
              <div className="password-container">
                  <input type="password" className="password-input" placeholder="Password" name="password" value={props.logininfo.password} onChange={props.handleChange} />
              </div>
              <div>
                <p></p>
                <input type="submit" value="Log In"/>
              </div>
              <div>
                <p></p>
                <p className="prompt-text">Don't have an Account? Sign Up!</p>
                <input type="button" value="Sign Up" className="login-button" onClick={props.toggleLogin}/>
              </div>
          </form>
        </div>
    )
}

export default Login
