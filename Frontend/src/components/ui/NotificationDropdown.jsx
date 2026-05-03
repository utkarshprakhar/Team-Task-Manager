import React from 'react';
import { formatTimeAgo } from './ActivityItem';

const sampleNotifications = [
  { id: 1, title: 'Task Completed', text: 'Sarah Jenkins completed "Draft project proposal"', time: new Date(Date.now() - 12 * 60000), icon: 'task_alt', color: 'text-emerald-600 bg-emerald-100' },
  { id: 2, title: 'New Comment', text: 'Marcus Chen commented on "Competitor Analysis"', time: new Date(Date.now() - 2 * 3600000), icon: 'chat', color: 'text-secondary bg-secondary/10' },
  { id: 3, title: 'Deadline Alert', text: '"Finalize color tokens" is due today', time: new Date(Date.now() - 5 * 3600000), icon: 'warning', color: 'text-error bg-error-container/40' },
  { id: 4, title: 'Member Added', text: 'Anna Loft was added to "Analytics Engine"', time: new Date(Date.now() - 24 * 3600000), icon: 'person_add', color: 'text-[#CC9966] bg-[#CC9966]/10' },
];

const NotificationDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      <div className="absolute right-0 top-full mt-2 w-80 bg-[#F7F5F3] rounded-2xl shadow-[0_12px_40px_rgba(89,79,77,0.15)] z-50 overflow-hidden border border-white/60">
        <div className="p-4 border-b border-[#594F4D]/5">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-on-surface">Notifications</h3>
            <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{sampleNotifications.length}</span>
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {sampleNotifications.map(n => (
            <div key={n.id} className="px-4 py-3 hover:bg-white/50 transition-colors cursor-pointer border-b border-[#594F4D]/3 last:border-0">
              <div className="flex gap-3">
                <div className={`w-9 h-9 ${n.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className="material-symbols-outlined text-[16px]">{n.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-on-surface">{n.title}</p>
                  <p className="text-[11px] text-outline mt-0.5 leading-relaxed truncate">{n.text}</p>
                  <p className="text-[10px] text-outline/60 mt-1 font-semibold">{formatTimeAgo(n.time)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-[#594F4D]/5">
          <button className="w-full text-center text-xs font-bold text-primary hover:bg-primary/5 py-2 rounded-xl transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;
