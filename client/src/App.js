import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Movies} />
        <Route path="/details/:id" component={Details} />
      </Fragment>
    </Router>
  );
}

export default App;
