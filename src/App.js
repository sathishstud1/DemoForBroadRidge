import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const Register = React.lazy(() => import('./views/Pages/Register/Register'));
const ErrorPage = React.lazy(() => import('./views/Pages/Error/LoginError'));
const Page500 = React.lazy(() => import('./views/Pages/Page500/Page500'));
const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <PersistGate persistor={persistor}>
          <React.Suspense fallback={loading()}>
            <Switch>             
              <Route exact
                     path="/register"
                     name="Register Page"
                     render={props => <Register {...props}/>}/>
              <Route exact
                     path="/error_page"
                     name="Error Page"
                     render={props => <ErrorPage {...props}/>}/>
              <Route exact
                     path="/500"
                     name="Page 500"
                     render={props => <Page500 {...props}/>}/>
              <Route path="*"
                     name="Home"
                     render={props => <DefaultLayout {...props}/>}/>
            </Switch>
          </React.Suspense>
          </PersistGate>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
