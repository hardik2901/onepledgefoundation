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
import AdminPageHomepageEditScreen from './screens/AdminPageHomepageEditScreen';
import AdminPageCompaniesEditScreen from './screens/AdminPageCompaniesEditScreen';
import AdminPageHomepageAddCardScreen from './screens/AdminPageHomepageAddCardScreen';
import AdminPageHomepageCardEditScreen from './screens/AdminPageHomepageCardEditScreen';
import AdminPageCompaniesFieldEditScreen from './screens/AdminPageCompaniesFieldEditScreen';
import PlayingWithDraftjs from './screens/PlayingWithDraftjs';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/draftjs' exact component={PlayingWithDraftjs} />
          <Route path='/' exact component={HomeScreen} />
          <Route path='/aboutus' exact component={AboutUsScreen} />
          <Route path='/whatwedo' exact component={WhatWeDoScreen} />
          <Route path='/contactus' exact component={ContactUsScreen} />
          <Route path='/becomevolunteer' exact component={BecomeVolunteerScreen} />
          <Route path='/login' exact component={LoginScreen} />
          <Route path='/admin' exact component={AdminPanelScreen} />
          <Route path='/homepage' exact component={AdminPageHomepageEditScreen} />
          <Route path='/homepage/:id/edit' exact component={AdminPageHomepageCardEditScreen} />
          <Route path='/companies' exact component={AdminPageCompaniesEditScreen} />
          <Route path='/companies/:id/edit' exact component={AdminPageCompaniesFieldEditScreen} />
          <Route path='/addnew' exact component={AdminPageHomepageAddCardScreen} />
          <Route path='/users/:id' exact component={CompanyPageScreen} />

        </Switch>
      </Router>
    </>
  );
}

export default App;
