'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProjectDetail from '@/components/ProjectDetail';

export default function ProjectDetailPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const params = useParams();
  const projectId = params.id as string;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#EBDFD7' }}>
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <main className={`flex-1 ${isCollapsed ? 'ml-[70px]' : 'ml-[220px]'} transition-all duration-300`}>
        <div className="px-8 pt-8">
          <Header />
        </div>
        
        <div className="px-8 py-6">
          <ProjectDetail projectId={projectId} />
        </div>
      </main>
    </div>
  );
}
