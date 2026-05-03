import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './ui/NotificationDropdown';
import { getInitials } from './ui/ActivityItem';

const TopAppBar = ({ title = "Dashboard" }) => {
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="w-full mb-8 sticky top-4 z-40">
      <div className="bg-[#F7F5F3] rounded-full px-6 py-3 shadow-[0_2px_12px_rgba(89,79,77,0.06)] flex justify-between items-center">
        {/* Left: Title + Search */}
        <div className="flex items-center gap-6 flex-1">
          <h2 className="text-lg font-bold text-[#594F4D] whitespace-nowrap">{title}</h2>
          <div className="relative flex-1 max-w-sm hidden sm:block">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#594F4D]/40 text-[20px]">search</span>
            <input
              className="w-full bg-white/60 border-none rounded-full py-2 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#CC9966]/40 placeholder:text-[#594F4D]/40 transition-all outline-none"
              placeholder="Search tasks, projects..."
              type="text"
            />
          </div>
        </div>
        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-4">
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2.5 text-[#594F4D]/60 hover:bg-[#CC9966]/5 rounded-full transition-all active:scale-95 relative"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-[#F7F5F3]"></span>
            </button>
            <NotificationDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
          </div>
          <div className="h-7 w-px bg-[#594F4D]/10 mx-1"></div>
          <div className="flex items-center gap-2.5 p-1 pl-3 bg-white/40 rounded-full">
            <span className="text-xs font-bold text-[#594F4D] hidden sm:inline">{user?.name?.split(' ')[0] || 'User'}</span>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white text-[10px] font-bold border-2 border-white">
              {getInitials(user?.name)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
