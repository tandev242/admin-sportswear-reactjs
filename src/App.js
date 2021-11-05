import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import { useDispatch, useSelector } from 'react-redux';
import { getInitData, isUserLoggedIn } from './actions';
import Product from './containers/Product';
import Signin from './containers/Signin';
import Category from './containers/Category';
import Order from './containers/Order';
import Brand from './containers/Brand';
import PrivateRoute from './components/HOC/PrivateRoute';
import User from './containers/User';
import Statistic from './containers/Statistic';



function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    } else {
      dispatch(getInitData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/product" component={Product} />
          <PrivateRoute path="/brand" component={Brand} />
          <PrivateRoute path="/user" component={User} />
          <PrivateRoute path="/order" component={Order} />
          <PrivateRoute path="/statistic" component={Statistic} />


          <Route path="/signin" component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
