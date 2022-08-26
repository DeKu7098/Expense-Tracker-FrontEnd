import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import WelcomePage from './SignUp/Welcome Page/WelcomePage';


function App() {
  return (
    <div>
      <Switch>
       <Route path="/WelcomePage" exact>
            <WelcomePage />
      </Route>
      <Route path='/'>
      <SignUp></SignUp>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
