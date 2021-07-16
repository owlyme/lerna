import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import AsynComponentsPage from './views/AsynComponentsPage';
import ViewComposePage from './views/viewComposePage';


function App() {
  return <Router>
    <Switch>
      <Route path="/list" component={AsynComponentsPage} />
      <Route path="/view" component={ViewComposePage} />
    </Switch>
  </Router>
}

export default App;
