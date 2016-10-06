import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthentication, getRegistration } from '../../reducers';
import { signup } from '../../actions';

class Signup extends Component {

  render() {
    const { authentication, registration } = this.props;
    let message = null;
    if (registration.message) {
      message = <div className={"alert alert-" + (registration.error ? "warning" : "success")}>
        {registration.message}
      </div>;
    }
    return (
      <div className="container">
        {message}
        {(!authentication.authenticated ? <SignupForm {...this.props} /> : null)}
      </div>
    );
  }

}

class SignupForm extends Component {

  render() {
    const { signup } = this.props;
    return (
      <form className="form-singup"
            style={{maxWidth: "330px", margin: "auto"}}
            onSubmit={(e) => {
              e.preventDefault();
              signup(
                this.refs.inputName.value,
                this.refs.inputPassword1.value,
                this.refs.inputPassword2.value
              );
            }}>
        <h2 className="form-singup-heading">Signup</h2>
        <p>
          <label htmlFor="inputName" className="sr-only">Name</label>
          <input id="inputName" ref="inputName" name="name" className="form-control" placeholder="Name" />
        </p>
        <p>
          <label htmlFor="inputPassword1" className="sr-only">Password</label>
          <input type="password" id="inputPassword1" ref="inputPassword1" name="password1" className="form-control" placeholder="Password" />
        </p>
        <p>
          <label htmlFor="inputPassword2" className="sr-only">Repeat Password</label>
          <input type="password" id="inputPassword2" ref="inputPassword2" name="password2" className="form-control" placeholder="Repeat Password" />
        </p>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Signup</button>
      </form>
    );
  }

}

const mapStateToProps = (state, params) => {
  return {
    authentication: getAuthentication(state),
    registration: getRegistration(state)
  };
};

export default connect(
  mapStateToProps,
  {signup}
)(Signup);
