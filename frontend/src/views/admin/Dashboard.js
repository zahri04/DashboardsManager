import React from "react";

// components

import CardGroupsStats from "components/Cards/CardGroupsStats";
import { useAuth } from "context/AuthContext";
import HeaderStats from "components/Headers/HeaderStats.js";
import CardRecentDisabledUsers from "components/Cards/CardRecentDisabledUsers";
import DashboardWelcome from "components/Dashboard/DashboardWelcome";

export default function Dashboard() {

  const {user}= useAuth();

  if(!user.authorities.includes("PERM_USER_MANAGEMENT") ) {
    return <DashboardWelcome />;
  }
   
  
  return (
    
    <>
    <HeaderStats />
      {/* <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div> */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <CardRecentDisabledUsers />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <CardGroupsStats />
        </div>
      </div>
    </>
  );
}
