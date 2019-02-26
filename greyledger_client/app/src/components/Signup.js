import React from 'react'

const Signup = (props) => {
    return (
        <div className="signup-container">
          <div className="login-logo-container">
              <img className="login-logo" src="./images/GREYLEDGER.png" alt="logo"></img>
          </div>
          <p></p>
            <form onSubmit={props.signup}>
              <div className="firstname-container">
                <div>{props.error!== null? props.error : null}</div>
                  <input type="text" className="firstname-input" placeholder="First Name" name="firstname" value={props.signupinfo.firstname} onChange={props.handleChange} />
              </div>
              <div className="lastname-container">
                  <input type="text" className="lastname-input" placeholder="Last Name" name="lastname" value={props.signupinfo.lastname} onChange={props.handleChange} />
              </div>
              <div className="email-container">
                  <input type="text" className="email-input" placeholder="Email" name="email" value={props.signupinfo.email} onChange={props.handleChange} />
              </div>
              <div className="password-container">
                  <input type="password" className="password-input" placeholder="Password" name="password" value={props.signupinfo.password} onChange={props.handleChange} />
              </div>
              <div><p></p><input type="submit" value="Sign Up" /></div>
              <div>
                  <p></p><p className="prompt-text" > Have an Account? Log In!</p>
                  <input type="submit" value="Log In" onClick={props.toggleLogin} />
                </div>
            </form>
        </div>
    )
}

export default Signup