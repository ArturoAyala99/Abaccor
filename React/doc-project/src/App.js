import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';

export default class App extends Component {

  render(){

    return(

      <Router>
        <Navbar/>
      </Router>

    );

  }

}