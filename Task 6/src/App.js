import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Employees } from "./pages/Employees";
import { Main } from "./pages/Main";
import { NotFound } from "./pages/NotFound";
import { Header } from "./components/Header";
import { ROUTES } from "./consts";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route path={ROUTES.MAIN} component={Main} exact />
          <Route path={ROUTES.EMPLOYEES} component={Employees} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
