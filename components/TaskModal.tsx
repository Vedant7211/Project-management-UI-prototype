'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Task } from '@/components/Board';

type TaskModalProps = {
  task: Task | null;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'columnId'>) => void;
};

const categories = [
  { name: 'DESIGN SYSTEM', color: '#10b981' },
  { name: 'DEVELOPMENT', color: '#ef4444' },
  { name: 'TYPOGRAPHY', color: '#3b82f6' },
  { name: 'MARKETING', color: '#f59e0b' },
  { name: 'RESEARCH', color: '#8b5cf6' },
];

export default function TaskModal({ task, onClose, onSave }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [category, setCategory] = useState(task?.category || categories[0].name);
  const [categoryColor, setCategoryColor] = useState(task?.categoryColor || categories[0].color);
  const [assigneeInput, setAssigneeInput] = useState('');
  const [assignees, setAssignees] = useState<string[]>(task?.assignees || []);

  const handleCategoryChange = (categoryName: string) => {
    const selectedCategory = categories.find((c) => c.name === categoryName);
    if (selectedCategory) {
      setCategory(selectedCategory.name);
      setCategoryColor(selectedCategory.color);
    }
  };

  const handleAddAssignee = () => {
    if (assigneeInput.trim() && !assignees.includes(assigneeInput.trim().toUpperCase())) {
      setAssignees([...assignees, assigneeInput.trim().toUpperCase()]);
      setAssigneeInput('');
    }
  };

  const handleRemoveAssignee = (assignee: string) => {
    setAssignees(assignees.filter((a) => a !== assignee));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title,
      description,
      category,
      categoryColor,
      assignees,
    });
  };

  const getInitialsColor = (initials: string) => {
    const colors = [
      '#3b82f6', // blue
      '#10b981', // green
      '#f59e0b', // yellow
      '#ef4444', // red
      '#8b5cf6', // purple
      '#ec4899', // pink
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
            >
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Assignees
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={assigneeInput}
                onChange={(e) => setAssigneeInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAssignee();
                  }
                }}
                placeholder="Enter initials (e.g., JD)"
                maxLength={2}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              />
              <button
                type="button"
                onClick={handleAddAssignee}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {assignees.map((assignee, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: getInitialsColor(assignee) }}
                  >
                    {assignee}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAssignee(assignee)}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
