import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, Events } from "./pages/";
import { Auth } from "./components";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Auth />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/events" component={Events} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default Routes;
