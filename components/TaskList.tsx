'use client';

interface Task {
  title: string;
  status: 'Approved' | 'In review' | 'On going';
  completed: boolean;
}

export default function TaskList() {
  const tasks: Task[] = [
    { title: 'Create a user flow of social application design', status: 'Approved', completed: true },
    { title: 'Create a user flow of social application design', status: 'In review', completed: false },
    { title: 'Landing page design for Fintech project of singapore', status: 'In review', completed: false },
    { title: 'Interactive prototype for app screens of deltamine project', status: 'On going', completed: false },
    { title: 'Interactive prototype for app screens of deltamine project', status: 'Approved', completed: true },
  ];

  const tabs = [
    { label: 'All', count: 15 },
    { label: 'Important', count: 0 },
    { label: 'Notes', count: 5 },
    { label: 'Links', count: 10 },
  ];

  const getStatusStyle = (status: Task['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'In review':
        return 'bg-red-100 text-red-700';
      case 'On going':
        return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="rounded-2xl p-6 shadow-lg " style={{ backgroundColor: 'rgba(255, 255, 255, 0.34)' }}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Today task</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium ${
              index === 0
                ? 'text-gray-900 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label} <span className="bg-blue-100 text-gray-900 px-1 rounded-md">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-start gap-3 py-2">
            <div className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center ${
              task.completed ? 'bg-orange-500' : 'border-2 border-gray-300'
            }`}>
              {task.completed && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{task.title}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(task.status)}`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
