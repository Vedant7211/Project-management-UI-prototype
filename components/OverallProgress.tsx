'use client';

import { ChevronDown } from 'lucide-react';
import GanttChart from './GanttChart';

export default function OverallProgress() {
  const stats = [
    { label: 'Total projects', value: '95', color: 'text-gray-700' },
    { label: 'Completed', value: '26', color: 'text-green-600' },
    { label: 'Delayed', value: '35', color: 'text-yellow-600' },
    { label: 'On going', value: '35', color: 'text-orange-600' },
  ];

  return (
    <div className="rounded-2xl p-6 shadow-lg " style={{ backgroundColor: 'rgba(255, 255, 255, 0.34)' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Overall Progress</h2>
        <button className="px-3 py-1.5 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-2">
          All
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Gantt Chart */}
      <div className="mb-8">
        <GanttChart />
      </div>

      {/* Stats Grid */}
      <div className="flex justify-between items-start gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
