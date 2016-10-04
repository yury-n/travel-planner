import React from 'react';

const Login = () => (
  <div className="container">
      <form className="form-signin" style={{maxWidth: "330px", margin: "auto"}}>
        <h2 className="form-signin-heading">Login</h2>
        <p>
          <label htmlFor="inputName" className="sr-only">Name</label>
          <input id="inputName" name="name" className="form-control" placeholder="Name" />
        </p>
        <p>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" />
        </p>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
    </div>
);

export default Login;
