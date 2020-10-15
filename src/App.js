import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage, JobsView, PostJobsView } from "./views";
import { Error } from "./components";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/jobs" component={JobsView} />
        <Route path="/postJob" component={PostJobsView} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
