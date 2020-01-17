import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home';
import Detail from './components/detail';
import Createpost from './components/createpost';
import Login from './components/login';
import Notfound from './components/notfound';
import Update from './components/update';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/create' exact component={Createpost} />
          <Route path='/login' exact component={Login} />
          <Route path='/detail/:id' exact component={Detail} />
          <Route path='/update/:id' exact component={Update} />
          <Route path='*' component={Notfound}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
