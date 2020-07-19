import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import StudentPage from "./page/StudentPage";
import RedirectPage from "./page/RedirectPage";

const App = () => {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <BrowserRouter>
        <Switch>
          <Route path={Path.login} component={LoginPage} />
          <Route path={Path.student} component={StudentPage} />
          <Route path={Path.redirect} component={RedirectPage} />
          {/*  DEFAULT: -> {LoginPage} */}
          <Route component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

//  ────────────────────────────────────────────────────────────── PATH ───┐
export const Path = {
  home: "/",
  login: "/login",
  student: "/student/:uid",
  redirect: "/redirect/:uid",
};
// <───────────────────────────────────────────────────────────────────────┘

export default App;
