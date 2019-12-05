import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies/*" component={Movies} />
          <Route
            path="/movies/"
            render={() => <Redirect exact to="/movies/in-theaters" />}
          />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
