import React, { Component } from 'react';
import {getAllCategories} from './api/readable';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
   super(props);
   this.state = {
     backend: 'backend-data'
   }
 }

  componentDidMount() {

  const url = `http://localhost:3001/categories`;
  console.log('fetching from url', url);
  fetch(url, {headers: { 'Authorization': 'whatever-you-want', 'Accept':'application/json','Content-Type':'application/json' },
             } )
    .then( (res) => { return(res.text()) })
    .then((data) => {
      console.log("data",data);
      this.setState({backend:data});


    });

    getAllCategories().then((data) => console.log("promise data",data) );

}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
         Talking to the backend yields these categories: <br/>
         {this.state.backend}
       </p>
      </div>
    );
  }
}

export default App;
