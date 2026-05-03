import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, logout } = useAuth();

  const getInitials = (name) => name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLink = (to, icon, label) => (
    <Link to={to} className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${currentPath === to ? 'bg-[#CC9966] text-white shadow-lg shadow-[#CC9966]/20' : 'text-[#594F4D] dark:text-stone-400 hover:bg-[#594F4D]/5 hover:translate-x-0.5'}`}>
      <span className="material-symbols-outlined">{icon}</span>
      <span className="font-label-lg text-[14px] font-semibold leading-[1.2] tracking-[0.05em]">{label}</span>
    </Link>
  );

  return (
    <aside className="fixed left-0 top-0 h-full w-72 flex flex-col p-6 gap-2 bg-[#F7F5F3] dark:bg-stone-800 rounded-r-[32px] border-r border-[#594F4D]/10 shadow-[0px_10px_30px_rgba(89,79,77,0.05)] z-50">
      <div className="flex items-center gap-4 px-4 py-6 mb-4">
        <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-3xl">task_alt</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#594F4D] dark:text-stone-200">Karya</h1>
          <p className="text-xs font-semibold text-[#594F4D]/60 uppercase tracking-widest">Smarter Workflows</p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        {navLink('/dashboard', 'dashboard', 'Dashboard')}
        {navLink('/projects', 'folder_open', 'Projects')}
        {navLink('/analytics', 'analytics', 'Analytics')}
        {navLink('/activity', 'history', 'Activity Log')}
      </nav>
      <div className="mt-auto pt-6 border-t border-[#594F4D]/5 flex flex-col gap-2">
        {navLink('/settings', 'settings', 'Settings')}
        {navLink('/support', 'help', 'Support')}

        {/* User profile from auth context */}
        <div className="mt-4 p-4 bg-secondary-container/30 rounded-3xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white text-sm font-bold border-2 border-white">
            {getInitials(user?.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-on-secondary-container truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] text-on-secondary-container/70 uppercase font-black">{user?.role || 'member'}</p>
          </div>
          <button onClick={handleLogout} className="p-1.5 hover:bg-error/10 rounded-full transition-all group" title="Logout">
            <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-error">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
