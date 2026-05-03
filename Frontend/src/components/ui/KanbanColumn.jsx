import React from 'react';
import TaskCard from './TaskCard';

const KanbanColumn = ({ label, dotColor, tasks }) => {
  return (
    <div className="min-h-[200px]">
      <div className="flex items-center gap-2.5 mb-4">
        <span className={`w-2.5 h-2.5 ${dotColor} rounded-full`}></span>
        <span className="text-[11px] font-bold text-outline uppercase tracking-[0.1em]">{label}</span>
        <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px] font-bold text-outline ml-auto">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} isDone={label === 'DONE'} />
        ))}
        {tasks.length === 0 && (
          <div className="border border-dashed border-[#594F4D]/10 rounded-xl p-6 text-center text-xs text-outline">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
