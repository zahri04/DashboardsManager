import { useAuth } from "../context/AuthContext";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Profile from "../views/admin/profile/Profile";
import Tables from "views/admin/Tables.js";
import Users from "../views/admin/users/Users.js";
import Groups from "../views/admin/groups/Groups";
import DashboardsList from "../views/admin/dashboard/DashboardsList.js";

const PrivateRoutes = ({ path }) => {   
    const { token, user, loading } = useAuth();
    if(!user) {
      return null;}


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!token || !user) { 
        return <Redirect to="/login" />; 
    }

    return (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar />
            <HeaderStats />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <Switch>
                <Route path={`${path}/dashboard`} exact component={Dashboard} />
                <Route path={`${path}/maps`} exact component={Maps} />
                <Route path={`${path}/profile`} exact component={Profile} />
                <Route path={`${path}/tables`} exact component={Tables} />

                {user.authorities.includes("PERM_USER_MANAGEMENT") &&(
                  <Route path="/admin/users" exact component={Users} />)}
                 {user.authorities.includes("PERM_GROUP_MANAGEMENT") &&(
                <Route path="/admin/groups" exact component={Groups} />)}
                {user.authorities.includes("PERM_DASHBOARD_MANAGEMENT") &&(
                <Route path="/admin/dashboardsList" exact component={DashboardsList} />)}
               
                {/* <Route path="/admin/dashboardsList/view" exact component={ViewDashboard} /> */}

                <Redirect from={path} to={`${path}/dashboard`} />
              </Switch>
              <FooterAdmin />
            </div>
          </div>
        </>
    );
};

export default PrivateRoutes;