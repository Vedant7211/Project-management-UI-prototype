'use client';

import { ChevronDown } from 'lucide-react';

export default function WorkloadChart() {
  const workloadData = [
    { name: 'Sam', value: 3 },
    { name: 'Meldy', value: 4 },
    { name: 'Ken', value: 1 },
    { name: 'Dmitry', value: 6 },
    { name: 'Vego', value: 4 },
    { name: 'Kadin', value: 1 },
    { name: 'Melm', value: 2 },
  ];

  return (
    <div className="rounded-2xl p-6 shadow-lg " style={{ backgroundColor: 'rgba(255, 255, 255, 0.34)' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Projects Workload</h2>
        <button className="px-3 py-1.5 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-2">
          Last 3 months
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-around gap-4 h-48 mt-16">
        {workloadData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex flex-col-reverse items-center gap-1">
              {Array.from({ length: item.value }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === item.value - 1 ? (item.name === 'Dmitry' ? 'bg-orange-500 text-white' : 'bg-black text-white') : 'border-2 border-gray-400'}`}
                >
                  {i === item.value - 1 ? String(item.value).padStart(2, '0') : ''}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600 mt-3">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
