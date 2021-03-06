import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './styling/index.css';
import App from './App';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import GreyhoundFactory from "./contracts/greyhoundFactory.json";

// let drizzle know what contracts we want
const options = { contracts: [GreyhoundFactory], polls: { blocks: 3000 } };

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// pass in the drizzle instance
ReactDOM.render(
  <Router>
    <App drizzle={drizzle} />
  </Router>,
  document.getElementById('root')
);
