'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { ChevronDown } from 'lucide-react';
import BoardColumn from '@/components/BoardColumn';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';

export type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  assignees: string[];
  columnId: string;
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To do',
    tasks: [
      {
        id: '1',
        title: 'Hero section',
        description: 'Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.',
        category: 'DESIGN SYSTEM',
        categoryColor: '#10b981',
        assignees: ['VH', 'JG'],
        columnId: 'todo',
      },
      {
        id: '2',
        title: 'Typography change',
        description: 'Modify typography and styling of text placed on 5 screens of the website design. Prepare a documentation.',
        category: 'TYPOGRAPHY',
        categoryColor: '#3b82f6',
        assignees: ['ML'],
        columnId: 'todo',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In progress',
    tasks: [
      {
        id: '3',
        title: 'Implement design screens',
        description: 'Our designers created 6 screens for a website that needs to be implemented by our dev team.',
        category: 'DEVELOPMENT',
        categoryColor: '#ef4444',
        assignees: ['VH', 'LK'],
        columnId: 'in-progress',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: '4',
        title: 'Fix bugs in the CSS code',
        description: 'Fix small bugs that are essential to prepare for the next release that will happen this quarter.',
        category: 'DEVELOPMENT',
        categoryColor: '#ef4444',
        assignees: ['RU', 'AL'],
        columnId: 'done',
      },
      {
        id: '5',
        title: 'Proofread final text',
        description: 'The text provided by marketing department needs to be proofread so that we make sure that it fits into our design.',
        category: 'TYPOGRAPHY',
        categoryColor: '#3b82f6',
        assignees: ['AG'],
        columnId: 'done',
      },
      {
        id: '6',
        title: 'Responsive design',
        description: 'All designs need to be responsive. The requirement is that it fits all web and mobile screens.',
        category: 'DESIGN SYSTEM',
        categoryColor: '#10b981',
        assignees: ['VH', 'AG'],
        columnId: 'done',
      },
    ],
  },
];

export default function Board() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [targetColumnId, setTargetColumnId] = useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    // Find if overId is a column or a task
    const overColumn = columns.find((col) => col.id === overId);
    const overTask = columns.flatMap((col) => col.tasks).find((t) => t.id === overId);

    const targetColumnId = overColumn ? overColumn.id : overTask?.columnId;

    if (!targetColumnId) return;

    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      
      // Find source column and task
      let sourceColumn: Column | undefined;
      let taskIndex = -1;
      let task: Task | undefined;

      for (const col of newColumns) {
        taskIndex = col.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          sourceColumn = col;
          task = col.tasks[taskIndex];
          break;
        }
      }

      if (!sourceColumn || !task) return prevColumns;

      // Remove task from source column
      sourceColumn.tasks.splice(taskIndex, 1);

      // Find target column
      const targetColumn = newColumns.find((col) => col.id === targetColumnId);
      if (!targetColumn) return prevColumns;

      // Update task's columnId
      task.columnId = targetColumnId;

      // Add task to target column
      if (overTask && overTask.columnId === targetColumnId) {
        // Insert at specific position
        const overTaskIndex = targetColumn.tasks.findIndex((t) => t.id === overId);
        targetColumn.tasks.splice(overTaskIndex, 0, task);
      } else {
        // Add to end of column
        targetColumn.tasks.push(task);
      }

      return newColumns;
    });
  };

  const handleAddTask = (columnId: string) => {
    setTargetColumnId(columnId);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTargetColumnId(task.columnId);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      }))
    );
  };

  const handleSaveTask = (task: Omit<Task, 'id' | 'columnId'>) => {
    if (editingTask) {
      // Update existing task
      setColumns((prevColumns) =>
        prevColumns.map((col) => ({
          ...col,
          tasks: col.tasks.map((t) =>
            t.id === editingTask.id ? { ...t, ...task } : t
          ),
        }))
      );
    } else {
      // Create new task
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        columnId: targetColumnId,
      };
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === targetColumnId
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col
        )
      );
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Board</h1>
        <button className="px-4 py-2 text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-50 flex items-center gap-2 border border-gray-200">
          This week
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Board Columns */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-4 gap-4">
          {columns.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 opacity-80">
              <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}
