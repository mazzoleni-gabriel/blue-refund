import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Register from "./containers/Register";
import RedirectLogin from "./containers/RedirectLogin";
import Admin from "./containers/Admin";
import Logout from "./containers/Logout";
import Usuario from "./containers/Usuario";







export default () =>
  <Switch>
    <Route path="/logout" exact component={Logout} />
    <Route path="/admin" exact component={Admin} />
    <Route path="/usuario" exact component={Usuario} />
    <Route path="/redirect-login" exact component={RedirectLogin} />
    <Route path="/login" exact component={Login} />
    <Route path="/registrar" exact component={Register} />
    <Route path="/" exact component={Home} />
    <Route component={NotFound} />
  </Switch>;