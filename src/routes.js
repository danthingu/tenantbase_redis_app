import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";
import HomepageLayout from "./containers/Home";
import Todo from "./components/todo";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Todo} />
  </Hoc>
);

export default BaseRouter;
