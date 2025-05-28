// src/components/PrivateRoutes.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Switch, Route, Redirect } from "react-router-dom";

// layouts & views
import AdminLayout from "./AdminLayout";
import Dashboard       from "views/admin/Dashboard.js";
import Profile         from "../views/admin/profile/Profile";
import Users           from "../views/admin/users/Users.js";
import Groups          from "../views/admin/groups/Groups";
import DashboardsList  from "../views/admin/dashboard/DashboardsList.js";
import DashboardView   from "views/admin/dashboardView/DashboardView";
import DashboardViewList from "views/admin/dashboardView/DashboardViewList";
import DashboardAccess   from "views/admin/dashboardAccess/DashboardAccess";

const PrivateRoutes = ({ path }) => {
  const { token, user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!token || !user) return <Redirect to="/login" />;

  // permission check helper
  const hasAccess = (perms = [], require = "any") => {
    if (perms.length === 0) return true;
    return require === "all"
      ? perms.every(p => user.authorities.includes(p))
      : perms.some(p => user.authorities.includes(p));
  };

  // route definitions
  const routes = [
    // public to any logged-in user
    { to: `${path}/profile`,        exact: true, component: Profile,           perms: [],                     require: "any" },
    { to: `${path}/dashboard`,      exact: true, component: Dashboard,         perms: [],                     require: "any" },


    // admin-only or permissioned routes
    { to: `${path}/dashboardView`,  exact: true, component: DashboardViewList, perms: ["PERM_DASHBOARDS_VIEW","PERM_USER_MANAGEMENT"], require: "any" },
    { to: `${path}/dashboardView/:id`, exact: true, component: DashboardView,    perms: ["PERM_DASHBOARDS_VIEW","PERM_USER_MANAGEMENT"],require: "any" },
    { to: `${path}/users`,          exact: true, component: Users,             perms: ["PERM_USER_MANAGEMENT"], require: "any" },
    { to: `${path}/groups`,         exact: true, component: Groups,            perms: ["PERM_GROUP_MANAGEMENT","PERM_DASHBOARD_MANAGEMENT"], require: "any" },
    { to: `${path}/dashboardsList`, exact: true, component: DashboardsList,     perms: ["PERM_DASHBOARD_MANAGEMENT","PERM_GROUP_MANAGEMENT"], require: "any" },
    {
      to: `${path}/dashboardAccess`,
      exact: true,
      component: DashboardAccess,
      perms: ["PERM_GROUP_MANAGEMENT", "PERM_DASHBOARD_MANAGEMENT"],
      require: "any"
    },
  ];

  return (
    <AdminLayout>
      <Switch>
        {routes.map(({ to, exact, component: C, perms, require }, idx) => {
          // skip if user lacks access
          if (!hasAccess(perms, require)) return null;
          return <Route key={idx} path={to} exact={exact} component={C} />;
        })}

        {/* fallback to dashboard */}
        <Redirect from={path} to={`${path}/dashboard`} />
      </Switch>
    </AdminLayout>
  );
};

export default PrivateRoutes;
