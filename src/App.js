import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// import {  getPhotosList } from './actions';
import Board from './components/Board/Board';
import BoardCollection from './components/BoardCollection/BoardCollection';
import TrelloNav from './components/Navbar/TrelloNav';
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from './components/SignIn';
import Background from "./assets/background.png"
function App(props) {

  const { isAuthenticated, isLoading } = props.auth;
  useEffect(() => {
    document.body.style.backgroundImage= `url(${Background})`;
    // document.body.style.background= 'linear-gradient(110deg, rgba(255,255,255,0.4206057422969187) 0%, rgba(203,116,54,0.7539390756302521) 51%)';
    document.body.style.backgroundRepeat='no-repeat'
    document.body.style.backgroundSize = 'cover';
    document.body.style.width = '100vl';
    document.body.style.height = '100vh';

  }, []);

  return (
    <Router>
      <TrelloNav isAuthenticated={isAuthenticated} isLoading={isLoading} />

      <Switch>
        <ProtectedRoute
          exact path="/"
          component={BoardCollection}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
        <Route path="/signin" component={SignIn} />
        <Route path="/board/:id" component={Board} isAuthenticated={isAuthenticated} isLoading={isLoading} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, )(App);
