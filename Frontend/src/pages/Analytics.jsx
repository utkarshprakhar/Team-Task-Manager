import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import StatsCard from '../components/ui/StatsCard';
import KanbanColumn from '../components/ui/KanbanColumn';
import { getInitials } from '../components/ui/ActivityItem';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('board');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, tasksRes] = await Promise.all([
          API.get('/analytics/dashboard'),
          API.get('/tasks'),
        ]);
        setStats(statsRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { key: 'todo', label: 'TO DO', dotColor: 'bg-outline/40' },
    { key: 'in-progress', label: 'IN PROGRESS', dotColor: 'bg-[#CC9966]' },
    { key: 'review', label: 'REVIEW', dotColor: 'bg-secondary' },
    { key: 'done', label: 'DONE', dotColor: 'bg-emerald-500' },
  ];

  const priorityBadge = (p) => {
    const map = { high: 'bg-red-50 text-red-500', medium: 'bg-amber-50 text-amber-600', low: 'bg-emerald-50 text-emerald-600' };
    return map[p] || map.medium;
  };

  // Weekly chart data (simulated)
  const weekData = [
    { day: 'Mon', completed: 4, inProgress: 2 },
    { day: 'Tue', completed: 6, inProgress: 3 },
    { day: 'Wed', completed: 3, inProgress: 5 },
    { day: 'Thu', completed: 8, inProgress: 4 },
    { day: 'Fri', completed: 5, inProgress: 6 },
    { day: 'Sat', completed: 2, inProgress: 1 },
    { day: 'Sun', completed: 1, inProgress: 0 },
  ];
  const maxChart = Math.max(...weekData.map(d => d.completed + d.inProgress), 1);

  // Overdue tasks for alerts
  const overdueTasks = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'done');

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-[#594F4D]/10 rounded-xl"></div>
        <div className="grid grid-cols-4 gap-5">{[1,2,3,4].map(i => <div key={i} className="h-32 bg-[#F7F5F3] rounded-2xl"></div>)}</div>
        <div className="grid grid-cols-2 gap-6">{[1,2].map(i => <div key={i} className="h-64 bg-[#F7F5F3] rounded-2xl"></div>)}</div>
        <div className="h-80 bg-[#F7F5F3] rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-extrabold text-on-surface leading-tight tracking-[-0.02em]">Performance Analytics</h2>
          <p className="text-[14px] text-outline mt-1">Track productivity metrics and manage your team's workflow efficiency.</p>
        </div>
        <div className="flex gap-3">
          <span className="px-5 py-2.5 bg-white/60 text-outline text-[12px] font-bold rounded-full border border-[#594F4D]/8 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            Last 7 Days
          </span>
          <button className="px-5 py-2.5 bg-secondary text-white text-[12px] font-bold rounded-full shadow-[0_4px_16px_rgba(71,100,92,0.25)] flex items-center gap-2 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export Report
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard label="Tasks Completed" value={stats?.doneTasks || 0} icon="check_circle" colorClass="bg-emerald-100 text-emerald-600" trend={12} trendLabel="vs last week" />
        <StatsCard label="Avg Completion" value={stats?.totalTasks > 0 ? `${Math.round(stats.doneTasks / Math.max(stats.totalUsers, 1))}` : '0'} icon="speed" colorClass="bg-[#CC9966]/10 text-[#CC9966]" trendLabel="tasks/member" />
        <StatsCard label="Active Members" value={stats?.totalUsers || 0} icon="group" colorClass="bg-secondary/10 text-secondary" trend={5} />
        <StatsCard label="Overdue Alerts" value={stats?.overdueTasks || 0} icon="warning" colorClass="bg-red-50 text-red-500" trend={-3} trendLabel="needs resolution" />
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2 bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-on-surface">Weekly Task Progress</h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-outline"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>Completed</span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-outline"><span className="w-2.5 h-2.5 bg-[#CC9966] rounded-full"></span>In Progress</span>
            </div>
          </div>
          <div className="flex items-end gap-4 h-48">
            {weekData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex flex-col gap-0.5">
                  <div className="w-full bg-[#CC9966] rounded-t-lg transition-all" style={{ height: `${(d.inProgress / maxChart) * 160}px` }}></div>
                  <div className="w-full bg-emerald-500 rounded-b-lg transition-all" style={{ height: `${(d.completed / maxChart) * 160}px` }}></div>
                </div>
                <span className="text-[11px] font-bold text-outline/60">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Status Donut */}
        <div className="bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
          <h3 className="text-lg font-bold text-on-surface mb-6">Task Status</h3>
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e8e0d8" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#CC9966" strokeWidth="3"
                strokeDasharray={`${(stats?.completionRate || 0)} 100`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-on-surface">{stats?.completionRate || 0}%</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Done</span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Completed', val: stats?.doneTasks || 0, color: 'bg-emerald-500' },
              { label: 'In Progress', val: stats?.inProgressTasks || 0, color: 'bg-[#CC9966]' },
              { label: 'Pending', val: (stats?.todoTasks || 0) + (stats?.reviewTasks || 0), color: 'bg-outline/30' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-2 text-outline"><span className={`w-2.5 h-2.5 ${s.color} rounded-full`}></span>{s.label}</span>
                <span className="font-bold text-on-surface">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors + Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Contributors */}
        <div className="bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
          <h3 className="text-lg font-bold text-on-surface mb-6">Top Contributors</h3>
          <div className="space-y-4">
            {(stats?.tasksPerUser || []).map((u, i) => {
              const pct = stats?.totalTasks ? Math.round((u.count / stats.totalTasks) * 100) : 0;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-[11px] font-bold text-on-surface-variant flex-shrink-0">
                    {getInitials(u.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[13px] font-semibold text-on-surface truncate">{u.name}</span>
                      <span className="text-[11px] font-bold text-outline ml-2">{u.count} tasks</span>
                    </div>
                    <div className="h-2 bg-[#594F4D]/8 rounded-full overflow-hidden">
                      <div className="h-full bg-[#CC9966] rounded-full transition-all duration-700" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 ml-2">{pct}%</span>
                </div>
              );
            })}
            {(stats?.tasksPerUser || []).length === 0 && <p className="text-sm text-outline text-center py-4">No contributor data</p>}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-on-surface">Critical Alerts</h3>
            {overdueTasks.length > 0 && (
              <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold">{overdueTasks.length} alerts</span>
            )}
          </div>
          <div className="space-y-3 max-h-56 overflow-y-auto custom-scrollbar">
            {overdueTasks.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-emerald-500 text-4xl mb-2 block">verified</span>
                <p className="text-sm text-outline">No critical alerts — you're on track!</p>
              </div>
            ) : (
              overdueTasks.slice(0, 5).map(task => (
                <div key={task._id} className="bg-white p-4 rounded-xl flex items-center gap-3 border-l-3 border-red-400">
                  <div className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-red-500 text-[18px]">schedule</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-on-surface truncate">{task.title}</p>
                    <p className="text-[11px] text-red-500 font-semibold">Due {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${priorityBadge(task.priority)}`}>{task.priority}</span>
                </div>
              ))
            )}
          </div>
          {overdueTasks.length > 0 && (
            <button className="w-full mt-4 py-2.5 bg-red-50 text-red-500 rounded-full text-[12px] font-bold hover:bg-red-100 transition-colors">
              Resolve All Alerts
            </button>
          )}
        </div>
      </section>

      {/* Kanban Board */}
      <section className="bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-on-surface">Task Board</h3>
            <div className="bg-white/60 rounded-full p-0.5 flex border border-[#594F4D]/5">
              <button onClick={() => setView('board')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${view === 'board' ? 'bg-[#CC9966] text-white shadow-sm' : 'text-outline'}`}>Board</button>
              <button onClick={() => setView('list')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${view === 'list' ? 'bg-[#CC9966] text-white shadow-sm' : 'text-outline'}`}>List</button>
            </div>
          </div>
          <span className="text-[12px] font-bold text-outline">{tasks.length} total tasks</span>
        </div>

        {view === 'board' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {columns.map(col => (
              <KanbanColumn key={col.key} label={col.label} dotColor={col.dotColor} tasks={tasks.filter(t => t.status === col.key)} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate" style={{ borderSpacing: '0 6px' }}>
              <thead>
                <tr className="text-[11px] font-bold text-outline uppercase tracking-[0.1em]">
                  <th className="px-4 pb-2">Task</th>
                  <th className="px-4 pb-2">Priority</th>
                  <th className="px-4 pb-2">Status</th>
                  <th className="px-4 pb-2">Assignee</th>
                  <th className="px-4 pb-2">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task._id} className="bg-white/50 hover:bg-white transition-colors cursor-pointer">
                    <td className="px-4 py-3 rounded-l-xl font-semibold text-[13px] text-on-surface">{task.title}</td>
                    <td className="px-4 py-3"><span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${priorityBadge(task.priority)}`}>{task.priority}</span></td>
                    <td className="px-4 py-3"><span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-secondary/10 text-secondary">{task.status}</span></td>
                    <td className="px-4 py-3 text-[12px] text-outline">{task.assignee?.name || '—'}</td>
                    <td className="px-4 py-3 rounded-r-xl text-[12px] text-outline">{task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Analytics;
