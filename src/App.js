import React,{ Component } from "react";
import { BrowserRouter, Route,Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import {Home} from './Comp/Home';
import {Info} from './Comp/Info';
import {Layout} from './Comp/layout';

const NotFound = () =>
    <div>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>

class App extends Component {
  

    render(){
      return (
        <Layout>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Info' component={Info} />
              <Route path='*' component={NotFound} />
            </Switch>
          </BrowserRouter>
        </Layout>
       
      )
    }
  }


export default App;
