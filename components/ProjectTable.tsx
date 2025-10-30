'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  manager: string;
  dueDate: string;
  status: 'Completed' | 'Delayed' | 'At risk' | 'On going';
  progress: number;
}

export default function ProjectTable() {
  const projects: Project[] = [
    {
      id: '1',
      name: 'Nelisa web development',
      manager: 'Om prakash sao',
      dueDate: 'May 25, 2023',
      status: 'Completed',
      progress: 100,
    },
    {
      id: '2',
      name: 'Datascale AI app',
      manager: 'Nelisan mando',
      dueDate: 'Jun 20, 2023',
      status: 'Delayed',
      progress: 28,
    },
    {
      id: '3',
      name: 'Media channel branding',
      manager: 'Tinuvelly priya',
      dueDate: 'July 13, 2023',
      status: 'At risk',
      progress: 100,
    },
    {
      id: '4',
      name: 'Coriax iOS app development',
      manager: 'Matte hannery',
      dueDate: 'Dec 20, 2023',
      status: 'Completed',
      progress: 100,
    },
    {
      id: '5',
      name: 'Website builder development',
      manager: 'Sukumar rao',
      dueDate: 'Mar 15, 2024',
      status: 'On going',
      progress: 50,
    },
  ];

  const getStatusStyle = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Delayed':
        return 'bg-yellow-100 text-yellow-700';
      case 'At risk':
        return 'bg-red-100 text-red-700';
      case 'On going':
        return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="rounded-2xl p-6 shadow-lg mb-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.34)' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project summary</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-2">
            Project
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-2">
            Project manager
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-2">
            Status
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Project manager</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Due date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-white transition-colors cursor-pointer">
                <td className="py-4 px-4 text-sm text-gray-900">
                  <Link href={`/project/${project.id}`} className="hover:text-orange-500 transition-colors">
                    {project.name}
                  </Link>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{project.manager}</td>
                <td className="py-4 px-4 text-sm text-gray-700">{project.dueDate}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="#e5e7eb"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke={project.progress === 100 ? '#10b981' : project.status === 'At risk' ? '#ef4444' : '#f59e0b'}
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 20}`}
                          strokeDashoffset={`${2 * Math.PI * 20 * (1 - project.progress / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
