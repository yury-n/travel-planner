import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthentication, getRegistration } from '../../reducers';
import { signup, signupFailure } from '../../actions';
import Message from '../Message';

class Signup extends Component {

  render() {
    const { authentication, registration } = this.props;

    let messageComponent = null;
    if (registration.message) {
      messageComponent = <Message message={registration.message}
                                  errored={registration.errored} />;
    }
    return (
      <div className="container">
        {messageComponent}
        {(!authentication.authenticated ? <SignupForm {...this.props} /> : null)}
      </div>
    );
  }

}

class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = this.refs.inputName.value;
    const password1 = this.refs.inputPassword1.value;
    const password2 = this.refs.inputPassword2.value;

    if (password1 != password2) {
      this.props.signupFailure('Passwords don\'t match.');
      return;
    }

    this.props.signup(name, password1);
  }

  render() {
    return (
      <form className="form-singup" style={{maxWidth: "330px", margin: "auto"}}
            onSubmit={this.handleSubmit}>
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
  {signup, signupFailure}
)(Signup);
