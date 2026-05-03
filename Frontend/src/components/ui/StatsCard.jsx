import React from 'react';

const StatsCard = ({ label, value, icon, colorClass = 'bg-[#CC9966]/10 text-primary-container', trend, trendLabel }) => {
  return (
    <div className="bg-[#F7F5F3] p-6 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)] hover:shadow-[0_8px_24px_rgba(89,79,77,0.1)] transition-all duration-300 flex flex-col gap-4 group">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 ${colorClass} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105`}>
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${trend >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
            <span className="material-symbols-outlined text-[14px]">{trend >= 0 ? 'trending_up' : 'trending_down'}</span>
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-xs font-bold text-outline uppercase tracking-[0.12em] mb-1">{label}</p>
        <p className="text-[28px] font-extrabold text-on-surface leading-none">{value}</p>
        {trendLabel && <p className="text-[11px] text-outline mt-1.5">{trendLabel}</p>}
      </div>
    </div>
  );
};

export default StatsCard;
