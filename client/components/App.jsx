import React from 'react';
import NavBar from './NavBar';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';

const App = ({ params }) => {

  let sectionComponent;
  switch (params.section) {
    case 'login':
      sectionComponent = <Login />;
      break;
    case 'signup':
      sectionComponent = <Signup />;
      break;
    default:
      sectionComponent = <Welcome />;
  }

  return (
    <div>
      <NavBar />
      {sectionComponent}
    </div>
  );
};

export default App;
