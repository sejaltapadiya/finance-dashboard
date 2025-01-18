import React from "react";
import './Dashboard.css';
import DataTable from './Table';
import Metrics from './Metrics';
import PieChart from './RiskRatingPieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
//import ReactLeaflet from './ReactLeaflet';

import { AuthProvider } from "./AuthContext";

const Dashboard = ({ riskData }) => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="metrics-container">
        <Metrics />
      </div>
      
      <div className="chart-container">
        <BarChart />
        <PieChart />
      </div>

      <AuthProvider>
        <div className="table-container">
          <DataTable />
        </div>
      </AuthProvider>

      <LineChart/>
    </div>
  );
};

export default Dashboard;
