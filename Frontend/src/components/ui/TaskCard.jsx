import React from 'react';
import { getInitials } from './ActivityItem';

const priorityStyles = {
  high: 'bg-red-50 text-red-500',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-emerald-50 text-emerald-600',
};

const TaskCard = ({ task, isDone = false }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-[0_1px_4px_rgba(89,79,77,0.06)] hover:shadow-[0_4px_16px_rgba(89,79,77,0.1)] transition-all duration-200 cursor-pointer group">
      <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full mb-2.5 ${priorityStyles[task.priority] || priorityStyles.medium}`}>
        {task.priority}
      </span>
      <h4 className={`text-[13px] font-semibold text-on-surface mb-1 leading-snug ${isDone ? 'line-through opacity-50' : ''}`}>
        {task.title}
      </h4>
      {task.description && (
        <p className="text-[11px] text-outline mb-2 line-clamp-2 leading-relaxed">{task.description}</p>
      )}
      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-[#594F4D]/5">
        {task.deadline ? (
          <span className="text-[10px] font-semibold text-outline flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">calendar_today</span>
            {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        ) : <span />}
        {task.assignee && (
          <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[8px] font-bold text-on-surface-variant" title={task.assignee.name}>
            {getInitials(task.assignee.name)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
