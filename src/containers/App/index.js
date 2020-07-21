 
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Header from '../../components/header'
import Footer from '../../components/footer'
import ErrorMessage from '../../components/errorMessage'
import Home from '../Home'
import NoMatch from '../NoMatch'
import './App.css'


function App() {
  const [errors, setErrors] = useState([])


  useEffect(() => {
    const interval = setInterval(() => {
      if(errors.length && errors[0].date + 13000 < Date.now()){ 
        const [, ...newError] = errors
        setErrors(newError)
      }
    }, 1000);

  return () => clearInterval(interval)
  })


  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container content">
          {errors.length? <ErrorMessage errors={errors} />:''}
          <Switch>
            <Route exact path="/">
              <Home errors={errors} setErrors={setErrors} />
            </Route>
            <Route path="/*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;