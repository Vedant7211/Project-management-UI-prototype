'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import OverviewStats from '@/components/OverviewStats';
import ProjectTable from '@/components/ProjectTable';
import OverallProgress from '@/components/OverallProgress';
import TaskList from '@/components/TaskList';
import WorkloadChart from '@/components/WorkloadChart';

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#EBDFD7' }}>
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <main className={`flex-1 ${isCollapsed ? 'ml-[70px]' : 'ml-[220px]'} transition-all duration-300`}>
        <div className="px-8 pt-8">
          <Header />
        </div>
        
        <div className="px-8">
          {/* Overview Stats */}
          <OverviewStats />

          {/* Project Summary and Overall Progress */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2">
              <ProjectTable />
            </div>
            <div>
              <OverallProgress />
            </div>
          </div>

          {/* Today Task and Projects Workload */}
          <div className="grid grid-cols-2 gap-6">
            <TaskList />
            <WorkloadChart />
          </div>
        </div>
      </main>
    </div>
  );
}
