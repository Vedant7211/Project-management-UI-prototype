'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Board from '../../components/Board';

export default function BoardPage() {
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
        
        <div className="px-8 py-6">
          <Board />
        </div>
      </main>
    </div>
  );
}
