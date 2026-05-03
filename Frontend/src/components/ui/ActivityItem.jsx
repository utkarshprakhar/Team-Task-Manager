import React from 'react';

const actionConfig = {
  created_task: { icon: 'add_task', label: 'created', color: 'text-primary bg-primary/10' },
  updated_task: { icon: 'edit', label: 'updated', color: 'text-secondary bg-secondary/10' },
  completed_task: { icon: 'task_alt', label: 'completed', color: 'text-emerald-600 bg-emerald-100' },
  deleted_task: { icon: 'delete', label: 'deleted', color: 'text-error bg-error-container/40' },
  created_project: { icon: 'create_new_folder', label: 'created project', color: 'text-primary bg-primary/10' },
  updated_project: { icon: 'edit_note', label: 'updated project', color: 'text-secondary bg-secondary/10' },
  deleted_project: { icon: 'folder_delete', label: 'deleted project', color: 'text-error bg-error-container/40' },
  assigned_task: { icon: 'person_add', label: 'assigned', color: 'text-[#CC9966] bg-[#CC9966]/10' },
  updated_task_status: { icon: 'swap_horiz', label: 'moved', color: 'text-secondary bg-secondary/10' },
  updated_members: { icon: 'group_add', label: 'updated team on', color: 'text-[#CC9966] bg-[#CC9966]/10' },
};

export const getInitials = (name) => name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

export const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const ActivityItem = ({ log, showTimeline = false }) => {
  const config = actionConfig[log.action] || { icon: 'info', label: log.action, color: 'text-outline bg-outline/10' };

  return (
    <div className={`relative flex gap-4 ${showTimeline ? '' : 'py-1'}`}>
      {showTimeline && (
        <div className="flex flex-col items-center">
          <div className={`relative z-10 w-10 h-10 rounded-full ${config.color} flex items-center justify-center flex-shrink-0`}>
            <span className="material-symbols-outlined text-[16px]">{config.icon}</span>
          </div>
          <div className="w-px flex-1 bg-outline-variant/30 mt-1"></div>
        </div>
      )}
      {!showTimeline && (
        <div className="w-10 h-10 rounded-full bg-surface-container-high flex-shrink-0 flex items-center justify-center text-[11px] font-bold text-on-surface-variant">
          {getInitials(log.user?.name)}
        </div>
      )}
      <div className="flex-1 pb-5">
        <div className="flex justify-between items-start gap-3">
          <p className="text-sm text-on-surface leading-relaxed">
            <span className="font-bold">{log.user?.name || 'Unknown'}</span>{' '}
            <span className="text-outline">{config.label}</span>{' '}
            <span className="text-primary font-semibold">'{log.targetTitle}'</span>
          </p>
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider whitespace-nowrap mt-0.5">{formatTimeAgo(log.createdAt)}</span>
        </div>
        {log.details && (
          <p className="text-xs text-outline mt-1.5 bg-white/60 px-3 py-2 rounded-lg italic">{log.details}</p>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
