import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return <div>hello webpack ^_^</div>;
  }
}

class App2 extends Component {
  render() {
    return <div>hello webpack 222 ^_^</div>;
  }
}

ReactDOM.render(<BrowserRouter basename='/example'>
    <Route path="/app" component={App} />
    <Route path="/app2" component={App2} />
</BrowserRouter>, document.getElementById("root"));
