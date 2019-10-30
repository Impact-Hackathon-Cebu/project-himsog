import React from 'react';
import {
  withRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import { Card } from 'antd';
import { connect } from 'react-redux';
import MainLayout from '../modules/core/containers/MainLayout';
import Login from '../modules/core/containers/Login';
import Signup from '../modules/core/containers/Signup';
import Admins from '../modules/admins/routes';
import Volunteers from '../modules/volunteers/routes';

function NotFound() {
  return (
    <Card>
      <h3>
        Error 404: Page Not Found
      </h3>
    </Card>
  );
}

class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component, isAuthenticated, path, location, ...rest
    } = this.props;

    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
            <MainLayout path={path} history={props.history} location={location}>
              <Component />
            </MainLayout>
        ) : (
          <Login />
        )
      )}/>
    );
  }
}

class UnauthenticatedOnlyRoute extends React.Component {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        !isAuthenticated ? (
            <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/',
          }}/>
        )
      )}/>
    );
  }
}

class MainRoutes extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <Switch>
        <UnauthenticatedOnlyRoute path="/login" component={Login} isAuthenticated={isAuthenticated}></UnauthenticatedOnlyRoute>
        <UnauthenticatedOnlyRoute path="/signup" component={Signup} isAuthenticated={isAuthenticated}></UnauthenticatedOnlyRoute>
        <PrivateRoute path="/volunteers" component={Volunteers} {...{isAuthenticated}}></PrivateRoute>
        <PrivateRoute path="/admins" component={Admins} {...{isAuthenticated}}></PrivateRoute>
        <PrivateRoute component={NotFound} isAuthenticated={isAuthenticated}></PrivateRoute>

      </Switch>
    );
  }
}


export default withRouter(
  connect(state => ({
    ...state.core,
  }))(MainRoutes),
);
