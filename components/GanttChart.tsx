'use client';

import { useState, useMemo } from 'react';

// Helper function to get the number of days in a month
const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

// Sample data for the Gantt chart
const sampleProjects = [
  {
    id: 'proj-1',
    name: 'Website Redesign',
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-07-31'),
    progress: 65,
    color: '#f97316',
  },
  {
    id: 'proj-2',
    name: 'Mobile App Development',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-09-30'),
    progress: 40,
    color: '#10b981',
  },
  {
    id: 'proj-3',
    name: 'API Integration',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-08-15'),
    progress: 80,
    color: '#3b82f6',
  },
  {
    id: 'proj-4',
    name: 'Marketing Campaign',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-10-31'),
    progress: 25,
    color: '#f59e0b',
  },
];

export default function GanttChart() {
  const [projects] = useState(sampleProjects);

  const { months, totalDays } = useMemo(() => {
    const allDates = projects.flatMap(p => [p.startDate, p.endDate]);
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

    const startMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    const endMonth = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);

    const monthArray = [];
    const currentMonth = new Date(startMonth);

    while (currentMonth <= endMonth) {
      monthArray.push(new Date(currentMonth));
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    const totalDaysCount = (endMonth.getTime() - startMonth.getTime()) / (1000 * 3600 * 24);

    return { months: monthArray, totalDays: totalDaysCount };
  }, [projects]);

  const getDayOffset = (date: Date) => {
    const chartStartDate = new Date(months[0].getFullYear(), months[0].getMonth(), 1);
    return (date.getTime() - chartStartDate.getTime()) / (1000 * 3600 * 24);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="relative min-w-[800px]">
        {/* Month Headers */}
        <div className="flex border-b border-gray-300">
          {months.map((month, index) => {
            const monthDays = daysInMonth(month.getMonth(), month.getFullYear());
            const widthPercentage = (monthDays / totalDays) * 100;
            return (
              <div
                key={index}
                className="py-2 px-3 text-center text-xs font-semibold text-gray-600 border-r border-gray-300 last:border-r-0"
                style={{ width: `${widthPercentage}%` }}
              >
                {month.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
            );
          })}
        </div>

        {/* Project Rows */}
        <div className="relative space-y-3 py-3">
          {projects.map((project, index) => {
            const leftOffset = (getDayOffset(project.startDate) / totalDays) * 100;
            const duration = (project.endDate.getTime() - project.startDate.getTime()) / (1000 * 3600 * 24);
            const width = (duration / totalDays) * 100;

            return (
              <div key={project.id} className="relative h-10 flex items-center">
                <p className="absolute left-0 text-sm font-medium text-gray-800 w-40 truncate pr-2">{project.name}</p>
                <div
                  className="absolute h-6 rounded-full bg-gray-200"
                  style={{ left: `calc(10rem + ${leftOffset}%)`, width: `calc(${width}% - 10rem)` }}
                >
                  <div
                    className="h-full rounded-full opacity-70"
                    style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                  ></div>
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white shadow-md"
                    style={{ left: `${project.progress}%`, backgroundColor: project.color, transform: 'translate(-50%, -50%)' }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
