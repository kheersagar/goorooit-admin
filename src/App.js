import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import NavSidebar from './components/NavSidebar';
import UserPage from './components/Users/UserPage';
import GuruPage from './components/Gurus/GuruPage';
import PaymentPage from './components/Payments/PaymentPage';
import UserDetails from './components/Users/UserDetails';
import GuruDetails from './components/Gurus/GuruDetails';
import EventPage from './components/Events/EventPage';
import AddEventForm from './components/Events/AddEventForm';
import EventTransactionTable from './components/Events/EventTransactionTable';
import SkillEditPage from './components/Gurus/SkillEditPage';
import EventDetail from './components/Events/EventDetail';
import ProfessionalPays from './components/ProfessionalPays/ProfessionalPays';
import BannerPage from './components/Banner/BannerPage';
import Banner from './components/Banner/Banner';
import ReferralTable from './components/Referrals/ReferralTable';
import VerificationRequestList from './components/Verification/VerificationRequestList';
import AllQuestions from './components/AllQuestions/AllQuestions';
import QuestionDetails from './components/AllQuestions/QuestionDetails';
import BidPurchase from './components/BidPurchase/BidPurchase';

export const history = createHistory();
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <NavSidebar>
          <Route path='/home' exact component={PaymentPage} />
          <Route path='/users' exact component={UserPage} />
          <Route path='/aspirant/detail/:id' exact component={UserDetails} />
          <Route path='/gurus' exact component={GuruPage} />
          <Route path='/gurus/detail/:id' exact component={GuruDetails} />
          <Route
            path='/professionals/detail/:id/edit-skill'
            exact
            component={SkillEditPage}
          />
          <Route path='/events' exact component={EventPage} />
          <Route path='/events/add' exact component={AddEventForm} />
          <Route
            path='/events/event-detail/:id'
            exact
            component={EventDetail}
          />
          <Route
            path='/event-transaction'
            exact
            component={EventTransactionTable}
          />
          <Route path='/banner' exact component={BannerPage} />
          <Route path='/banner/add' exact component={Banner} />
          <Route path='/referrals' exact component={ReferralTable} />
          <Route path='/bid-purchase' exact component={BidPurchase} />
          <Route path='/all-questions' exact component={AllQuestions} />
          <Route
            path='/verification-request'
            exact
            component={VerificationRequestList}
          />
          <Route
            path='/professional-payment'
            exact
            component={ProfessionalPays}
          />
          <Route path='/payments' exact component={PaymentPage} />
        <Route path='/admin/:questionId' exact  component={QuestionDetails}/>
        </NavSidebar>
      </Switch>
    </Router>
  );
};

export default App;
