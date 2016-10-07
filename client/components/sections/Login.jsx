import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthentication } from '../../reducers';
import { login } from '../../actions';
import Message from '../Message';

class Login extends Component {

  render() {
    const { authentication } = this.props;
    
    let messageComponent = null;
    if (authentication.message) {
      messageComponent = <Message message={authentication.message}
                                  errored={authentication.errored} />;
    }
    return (
      <div className="container">
        {messageComponent}
        {(!authentication.authenticated ? <LoginForm {...this.props} /> : null)}
      </div>
    );
  }
};

class LoginForm extends Component {

  render() {
    const { login } = this.props;
    return (
      <form className="form-signin"
            style={{maxWidth: "330px", margin: "auto"}}
            onSubmit={(e) => {
              e.preventDefault();
              login(this.refs.inputName.value, this.refs.inputPassword.value);
            }}>
        <h2 className="form-signin-heading">Login</h2>
        <p>
          <label htmlFor="inputName" className="sr-only">Name</label>
          <input id="inputName" ref="inputName" name="name" className="form-control" placeholder="Name" />
        </p>
        <p>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" ref="inputPassword" name="password" className="form-control" placeholder="Password" />
        </p>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
    );
  }
}

const mapStateToProps = (state, params) => {
  return {
    authentication: getAuthentication(state)
  };
};

export default connect(
  mapStateToProps,
  {login}
)(Login);
