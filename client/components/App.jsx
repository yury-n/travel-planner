import React from 'react';
import NavBar from './NavBar';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';

const App = ({ params }) => {

  let content;
  switch (params.section) {
    case 'login':
      content = <Login />;
      break;
    case 'signup':
      content = <Signup />;
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
