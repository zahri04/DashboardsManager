import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import PrivateRoutes from "layouts/PrivateRoutes.js";
import Auth from "layouts/Auth.js";
import { TokenInterceptor } from "./Axios";
import { AuthProvider } from "context/AuthContext";

TokenInterceptor(); // Initialize Axios interceptor
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        {/* Public routes */}
       
        
        {/* Protected routes */}
        <PrivateRoutes path="/admin" />
        <Route path="/login" exact component={Auth} />
        <Route path="/register" exact component={Auth} />
        
        {/* Default redirects */}
        <Route exact path="/">
          {({ location }) => {
            // Check auth here or let PrivateRoutes handle it
            return <Redirect to="/admin/dashboard" />;
          }}
        </Route>
        
        {/* Catch-all redirect */}
        <Redirect to="/admin/dashboard" />
      </Switch>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);