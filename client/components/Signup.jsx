import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions';

class Signup extends Component {

  render() {
    return (
      <div className="container">
          {(!authentication.authenticated ? <SignupForm {...this.props} /> : null)}
      </div>
    );
  }

}

class SignupForm extends Component {

  render() {
    return (
      <form className="form-singup" style={{maxWidth: "330px", margin: "auto"}}>
        <h2 className="form-singup-heading">Signup</h2>
        <p>
          <label htmlFor="inputName" className="sr-only">Name</label>
          <input id="inputName" name="name" className="form-control" placeholder="Name" />
        </p>
        <p>
          <label htmlFor="inputPassword1" className="sr-only">Password</label>
          <input type="password" id="inputPassword1" name="password1" className="form-control" placeholder="Password" />
        </p>
        <p>
          <label htmlFor="inputPassword2" className="sr-only">Repeat Password</label>
          <input type="password" id="inputPassword2" name="password2" className="form-control" placeholder="Repeat Password" />
        </p>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Signup</button>
      </form>
    );
  }

}

export default Signup;
