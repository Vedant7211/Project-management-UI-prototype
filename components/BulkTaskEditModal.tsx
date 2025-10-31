'use client';

import { useState } from 'react';
import { Plus, Trash2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

// Matches the structure from the previous inline editor
export type EditableTask = {
  id: string;
  title: string;
  assignee: string;
  status: 'To do' | 'In progress' | 'Review' | 'Done';
};

type BulkTaskEditModalProps = {
  initialTasks: EditableTask[];
  onClose: () => void;
  onSave: (tasks: EditableTask[]) => void;
};

export default function BulkTaskEditModal({ initialTasks, onClose, onSave }: BulkTaskEditModalProps) {
  const [tasks, setTasks] = useState<EditableTask[]>(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const handleAddTaskRow = () => {
    const newId = `new-${Date.now()}`;
    const newTask: EditableTask = {
      id: newId,
      title: '',
      assignee: '',
      status: 'To do',
    };
    setTasks([...tasks, newTask]);
    setEditingTaskId(newId);
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTaskChange = (id: string, field: keyof EditableTask, value: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task))
    );
  };

  const handleSaveTask = (id: string) => {
    const taskToSave = tasks.find(t => t.id === id);
    if (taskToSave && !taskToSave.title.trim()) {
        // Prevent saving if title is empty
        toast.error('Task title cannot be empty.');
        return;
    }
    setEditingTaskId(null);
    if (taskToSave) {
      toast.success(`Task "${taskToSave.title}" updated successfully.`, {
        style: { backgroundColor: '#10b981', color: 'white' },
      });
    }
  };

  const handleCancelEdit = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task?.id.startsWith('new-')) {
        handleRemoveTask(id); // Remove new rows if canceled
    }
    setEditingTaskId(null);
  };

  const handleSaveAll = () => {
    // Filter out any new rows that are still empty
    const validTasks = tasks.filter(t => t.id.startsWith('new-') ? t.title.trim() !== '' : true);
    onSave(validTasks);
  };

  const getStatusColor = (status: EditableTask['status']) => {
    switch (status) {
      case 'To do': return 'bg-gray-200 text-gray-800';
      case 'In progress': return 'bg-blue-200 text-blue-800';
      case 'Review': return 'bg-yellow-200 text-yellow-800';
      case 'Done': return 'bg-green-200 text-green-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Bulk Edit Tasks</h2>
          <div className='flex items-center gap-2'>
             <button onClick={handleAddTaskRow} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2">
                <Plus className="w-4 h-4"/>
                Add Task
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left font-semibold text-gray-600 p-3">Task Title</th>
                <th className="text-left font-semibold text-gray-600 p-3">Assignee</th>
                <th className="text-left font-semibold text-gray-600 p-3">Status</th>
                <th className="text-right font-semibold text-gray-600 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-200 last:border-0">
                  {editingTaskId === task.id ? (
                    <>
                      <td className="p-2">
                        <input
                          type="text"
                          value={task.title}
                          onChange={(e) => handleTaskChange(task.id, 'title', e.target.value)}
                          className="w-full px-2 py-1.5 border border-orange-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Enter task title"
                          autoFocus
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={task.assignee}
                          onChange={(e) => handleTaskChange(task.id, 'assignee', e.target.value)}
                          className="w-full px-2 py-1.5 border border-orange-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Enter assignee"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={task.status}
                          onChange={(e) => handleTaskChange(task.id, 'status', e.target.value)}
                          className="w-full px-2 py-1.5 border border-orange-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option>To do</option>
                          <option>In progress</option>
                          <option>Review</option>
                          <option>Done</option>
                        </select>
                      </td>
                      <td className="p-2 text-right">
                        <button onClick={() => handleSaveTask(task.id)} className="p-2 text-green-600 hover:bg-green-100 rounded-md">
                            <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleCancelEdit(task.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-md">
                            <X className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 text-gray-800 font-medium cursor-pointer hover:bg-gray-50" onClick={() => setEditingTaskId(task.id)}>{task.title}</td>
                      <td className="p-3 text-gray-600 cursor-pointer hover:bg-gray-50" onClick={() => setEditingTaskId(task.id)}>{task.assignee}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => setEditingTaskId(task.id)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        </button>
                        <button onClick={() => handleRemoveTask(task.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-md">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-white sticky bottom-0">
            <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Cancel
            </button>
            <button type="button" onClick={handleSaveAll} className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
              Save Changes
            </button>
        </div>
      </div>
    </div>
  );
}
