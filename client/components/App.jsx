import React from 'react';
import NavBar from './NavBar';
import Welcome from './sections/Welcome';
import Login from './sections/Login';
import Signup from './sections/Signup';
import Users from './sections/Users';

const App = ({ params }) => {

  let content;
  switch (params.section) {
    case 'login':
      content = <Login />;
      break;
    case 'signup':
      content = <Signup />;
      break;
    case 'users'  :
      content = <Users />;
      break;
    default:
      content = <Welcome />;
  }

  return (
    <div>
      <NavBar />
      {content}
    </div>
  );
};

export default App;
