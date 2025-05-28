import React from "react";
import { Switch, Route } from "react-router-dom";

// views
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

export default function Auth() {
  return (
    <>
    
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            
          </Switch>

    </>
  );
}
