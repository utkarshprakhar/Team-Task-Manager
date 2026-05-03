import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import ActivityItem, { getInitials, formatTimeAgo } from '../components/ui/ActivityItem';

const ActivityTimeline = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  const fetchActivity = async (p = 1) => {
    try {
      const { data } = await API.get(`/activity?limit=15&page=${p}`);
      setLogs(data.logs || []);
      setPagination(data.pagination || { total: 0, pages: 1 });
    } catch (err) {
      console.error('Activity fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchActivity(page); }, [page]);

  // Derive stats from logs
  const completedCount = logs.filter(l => l.action === 'completed_task').length;
  const activeCount = logs.filter(l => ['created_task', 'updated_task', 'assigned_task'].includes(l.action)).length;

  // Unique contributors
  const contributors = [];
  const seen = new Set();
  logs.forEach(l => {
    if (l.user && !seen.has(l.user._id)) {
      seen.add(l.user._id);
      contributors.push(l.user);
    }
  });

  // Timeline bar data (simulated summary)
  const timelineBars = [
    { label: 'Overdue', count: 3, color: 'bg-red-400', textColor: 'text-red-500' },
    { label: 'Completed', count: completedCount || 2, color: 'bg-emerald-500', textColor: 'text-emerald-600' },
    { label: 'Today', count: logs.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length || 1, color: 'bg-amber-400', textColor: 'text-amber-600' },
    { label: 'Planned', count: activeCount || 4, color: 'bg-[#594F4D]/20', textColor: 'text-outline' },
  ];
  const totalBars = timelineBars.reduce((s, b) => s + b.count, 0) || 1;

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-24 bg-[#F7F5F3] rounded-2xl"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 h-96 bg-[#F7F5F3] rounded-2xl"></div>
          <div className="h-96 bg-[#F7F5F3] rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Timeline Overview Bar */}
      <section className="bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-on-surface">Timeline View</h3>
          <div className="flex items-center gap-5">
            {timelineBars.map(b => (
              <span key={b.label} className="flex items-center gap-1.5 text-[11px] font-bold text-outline">
                <span className={`w-2.5 h-2.5 ${b.color} rounded-full`}></span>{b.label}
              </span>
            ))}
          </div>
        </div>
        {/* Horizontal stacked bar */}
        <div className="flex gap-1 h-8 rounded-full overflow-hidden bg-[#594F4D]/5">
          {timelineBars.map(b => (
            <div key={b.label} className={`${b.color} rounded-full flex items-center justify-center transition-all duration-500 relative group`}
              style={{ width: `${(b.count / totalBars) * 100}%`, minWidth: '32px' }}>
              <span className="text-[10px] font-bold text-white">{b.count}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Past Due</span>
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Upcoming</span>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Real-time Feed */}
        <div className="lg:col-span-2">
          <div className="bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-on-surface">Real-time Feed</h3>
              <span className="px-4 py-1.5 bg-secondary/10 text-secondary text-[11px] font-bold rounded-full">Latest First</span>
            </div>

            {logs.length === 0 ? (
              <p className="text-center text-outline py-12 text-sm">No activity recorded yet.</p>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-5 bottom-5 w-px bg-outline-variant/20"></div>
                <div className="space-y-0">
                  {logs.map((log) => (
                    <ActivityItem key={log._id} log={log} showTimeline={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-8 pt-6 border-t border-[#594F4D]/5">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-5 py-2 rounded-full text-[11px] font-bold border border-[#594F4D]/10 text-outline hover:bg-white disabled:opacity-40 transition-all">Previous</button>
                <span className="px-4 py-2 text-[11px] font-bold text-outline">{page} / {pagination.pages}</span>
                <button disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)} className="px-5 py-2 rounded-full text-[11px] font-bold border border-[#594F4D]/10 text-outline hover:bg-white disabled:opacity-40 transition-all">Next</button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Sprint Progress */}
          <div className="bg-gradient-to-br from-[#594F4D] to-[#3a3230] p-6 rounded-2xl text-white">
            <h4 className="font-bold text-base mb-1">Sprint Progress</h4>
            <p className="text-white/50 text-[11px] mb-5">Current sprint overview</p>
            <div className="mb-4">
              <div className="flex justify-between text-[11px] mb-2">
                <span className="text-white/60">Completion</span>
                <span className="font-bold">{pagination.total > 0 ? Math.round((completedCount / pagination.total) * 100) : 0}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${pagination.total > 0 ? (completedCount / pagination.total) * 100 : 0}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 p-3.5 rounded-xl text-center">
                <p className="text-xl font-extrabold">{activeCount}</p>
                <p className="text-[10px] uppercase tracking-wider text-white/50 mt-0.5">Active</p>
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl text-center">
                <p className="text-xl font-extrabold">{completedCount}</p>
                <p className="text-[10px] uppercase tracking-wider text-white/50 mt-0.5">Done</p>
              </div>
            </div>
          </div>

          {/* Active Contributors */}
          <div className="bg-[#F7F5F3] p-6 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
            <h4 className="text-sm font-bold text-on-surface mb-4">Active Contributors</h4>
            <div className="flex -space-x-2 mb-4">
              {contributors.slice(0, 5).map((u) => (
                <div key={u._id} className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-[#F7F5F3] flex items-center justify-center text-[10px] font-bold text-on-surface-variant" title={u.name}>
                  {getInitials(u.name)}
                </div>
              ))}
              {contributors.length > 5 && (
                <div className="w-10 h-10 rounded-full bg-[#CC9966]/10 border-2 border-[#F7F5F3] flex items-center justify-center text-[10px] font-bold text-[#CC9966]">
                  +{contributors.length - 5}
                </div>
              )}
            </div>
            <button className="w-full py-2.5 border border-[#594F4D]/10 rounded-full text-[11px] font-bold text-outline hover:bg-white/50 transition-colors">
              View All Members
            </button>
          </div>

          {/* Quick Note */}
          <div className="border-2 border-dashed border-[#594F4D]/12 rounded-2xl p-6 flex flex-col items-center gap-3 hover:bg-white/30 hover:border-[#CC9966]/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary">edit_note</span>
            </div>
            <p className="font-bold text-[13px] text-on-surface">Quick Note</p>
            <p className="text-[11px] text-outline text-center leading-relaxed">Capture updates and ideas instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
