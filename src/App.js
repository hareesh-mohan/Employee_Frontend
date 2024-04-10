// App.js

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import AcademicInstitutionDashboard from './components/AcademicInstitutionDashboard';
import CompanyDashboard from './components/CompanyDashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/user">
            <UserDashboard />
          </Route>
          <Route path="/institution">
            <AcademicInstitutionDashboard />
          </Route>
          <Route path="/company">
            <CompanyDashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
