import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Posts from "./components/Posts";
import { AuthProvider } from "./auth/useAuth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <h1>Firebase OAuth</h1>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/posts' component={Posts} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
