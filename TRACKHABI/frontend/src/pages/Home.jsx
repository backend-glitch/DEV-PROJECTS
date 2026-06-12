import React from "react";
import Layout from "../components/layout/Layout";
import {FaBars, FaTimes} from "react-icons/fa";
import TodayHabits from "../components/layout/todayhabits/TodayHabits";
import StatsCards from "../components/layout/StatCard/StatsCard";
import { useState } from "react";
import StatProgress from "../components/layout/StatCard/StatProgress";
import WeeklyProgress from "../components/layout/StatCard/WeeklyProgress";
import MonthlyHeatmap from "../components/layout/StatCard/MonthlyHeatmap";
import HabitGrid from "../components/layout/StatCard/HabitGrid";

function Home() {

  const [refreshFlag, setRefreshFlag] = useState(false);

const triggerRefresh = () => {
  setRefreshFlag(prev => !prev);
};


  return (
    <Layout>

   
      <StatsCards refresh={refreshFlag}/>

      <div className="grid grid-cols-2 gap-6">

        <TodayHabits onChange={triggerRefresh} />

  <div className="grid grid-rows-2 gap-6">
       <StatProgress refresh={refreshFlag} />
     
       <MonthlyHeatmap refresh={refreshFlag}/>

       </div>


      </div>

    


    </Layout>
  );
}

export default Home;