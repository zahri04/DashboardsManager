import React, { use } from "react";
import AxiosInstance from "Axios.js";
import { useState, useEffect } from "react";
import { useAuth } from "context/AuthContext";
// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {

const [stats, setStats] = useState({
  totalUsers:0,
  usersThisWeek:0,
  totalDashboards:0,
  totalGroups:0,
});

const fetchStats = async () => {
  try {
    const response = await AxiosInstance.get("dashboard/stats");
    setStats(response.data);
  } catch (err) {
    console.error("Error fetching stats:", err);
  
  }
}
useEffect(() => {
  const getStats = async () => {
    const stats = await fetchStats();
    if (stats) {
      setStats(stats);
    }
  };
  getStats();
}, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL USERS"
                  statTitle={stats.totalUsers}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW USERS THIS WEEK"
                  statTitle={stats.usersThisWeek}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Dashboards"
                  statTitle={stats.totalDashboards}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Groups"
                  statTitle={stats.totalGroups}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
