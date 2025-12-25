'use client';
import '@/lib/chart';
import { useState } from 'react';
import { useTaskAnalytics } from '../hooks/useTasksQueries';
import CompletionPie from '../components/CompletionPie';
import OnTimeLineChart from '../components/OnTimeLineChart';
import DurationScatter from '../components/DurationScatter';
import Tab from '../components/Tab';
import SideBar from "../components/SideBar";
import { CiMenuBurger } from "react-icons/ci";

type AnalyticsTab = 'OVERVIEW' | 'ON_TIME' | 'SCATTER';

export default function TaskAnalytics() {
  const userId = localStorage.getItem("userId");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const { taskAnalytics, loading, error } = useTaskAnalytics(userId || '');
  const [selectedTab, setSelectedTab] = useState<AnalyticsTab>('OVERVIEW');
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  if (loading) return <div className="p-10 text-green-400">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error loading analytics</div>;
  if (!taskAnalytics) return null;

  return (
    <div className="bg-black min-h-screen flex flex-col relative overflow-x-hidden">
        <button type="button" onClick={toggleSidebar} className="absolute top-4 left-4 z-50 text-green-400 hover:text-green-600 focus:outline-none">
            <CiMenuBurger className="w-12 h-6" />
        </button>
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} p-10`}>
            <h1 className="text-5xl font-bold text-green-400 text-center py-10">
                Task Analytics
            </h1>
            <div className="flex justify-center mb-10">
                <div className="flex rounded-xl overflow-hidden shadow-lg">
                <Tab label="Completion Overview" active={selectedTab === 'OVERVIEW'} onClick={() => setSelectedTab('OVERVIEW')}/>
                <Tab label="On-Time vs Overdue" active={selectedTab === 'ON_TIME'} onClick={() => setSelectedTab('ON_TIME')}/>
                <Tab label="Duration Scatter" active={selectedTab === 'SCATTER'} onClick={() => setSelectedTab('SCATTER')}/>
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-6 shadow-lg h-[520px] w-full flex flex-col">
                {selectedTab === 'OVERVIEW' && (
                <>
                    <h2 className="text-green-400 text-xl mb-6 text-center">
                    Task Completion Overview
                    </h2>
                    <CompletionPie {...taskAnalytics.completionOverview} />
                </>
                )}
                {selectedTab === 'ON_TIME' && (
                <>
                    <h2 className="text-green-400 text-xl mb-6 text-center">
                    On-Time vs Overdue
                    </h2>
                    <OnTimeLineChart {...taskAnalytics.onTimeStats} />
                </>
                )}
                {selectedTab === 'SCATTER' && (
                <>
                    <h2 className="text-green-400 text-xl mb-6 text-center">
                    Planned vs Actual Duration
                    </h2>
                    <DurationScatter data={taskAnalytics.scatterData} />
                </>
                )}
            </div>
        </div>
    </div>
  );
}
