import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import WelcomePage from './Pages/WelcomePage';
import CompleteProfile from './Pages/CompleteProfile';
import ChangePassword from './SignUp/ChangePassword';
import { useSelector } from 'react-redux';




function App() {
 const items = useSelector(state => state.data.items);
 const token = useSelector(state => state.auth.IDTOKEN);
 console.log(items);
 console.log(token);
 
  return (
    <div>
      <Switch>
       <Route path="/WelcomePage" exact>
            <WelcomePage />
      </Route>
      <Route path='/CompleteProfile'>
        <CompleteProfile />
      </Route>
      <Route path='/ChangePassword' exact>
        <ChangePassword />
      </Route>
      <Route path='/'>
      <SignUp></SignUp>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
