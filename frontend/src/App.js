import React from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import WhatWeDoScreen from './screens/WhatWeDoScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import BecomeVolunteerScreen from './screens/BecomeVolunteerScreen';
import LoginScreen from './screens/LoginScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import CompanyPageScreen from './screens/CompanyPageScreen';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/aboutus' component={AboutUsScreen} />
          <Route path='/whatwedo' component={WhatWeDoScreen} />
          <Route path='/contactus' component={ContactUsScreen} />
          <Route path='/becomevolunteer' component={BecomeVolunteerScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/admin' component={AdminPanelScreen} />
          <Route path='/:id' component={CompanyPageScreen} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
