import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthentication } from '../reducers';
import { login } from '../actions';

class Login extends Component {

  render() {
    const { authentication, login } = this.props;
    return (
      <div className="container">
        <form className="form-signin" style={{maxWidth: "330px", margin: "auto"}}>
          <h2 className="form-signin-heading">Login</h2>
          <p>
            <label htmlFor="inputName" className="sr-only">Name</label>
            <input id="inputName" ref="inputName" name="name" className="form-control" placeholder="Name" />
          </p>
          <p>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" ref="inputPassword" name="password" className="form-control" placeholder="Password" />
          </p>
          <button className="btn btn-lg btn-primary btn-block"
                  type="button"
                  onClick={() => login(this.refs.inputName.value, this.refs.inputPassword.value)}>
                  Login
          </button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state, params) => {
  return {
    authentication: getAuthentication(state)
  };
};

export default connect(
  mapStateToProps,
  {login}
)(Login);
