import React , {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Home from './containers/Home';
import Category from './containers/Category';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUserLoggedIn } from './actions';
import Products from './containers/Product';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
      // dispatch(getProducts());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/category" component = {Category}/>
            <Route path="/products" component = {Products}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
