import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import StatsCard from '../components/ui/StatsCard';
import ActivityItem from '../components/ui/ActivityItem';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes, tasksRes] = await Promise.all([
          API.get('/analytics/dashboard'),
          API.get('/activity?limit=5'),
          API.get('/tasks?sort=deadline&limit=6'),
        ]);
        setStats(statsRes.data);
        setActivity(activityRes.data.logs || []);
        setTasks(tasksRes.data || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const priorityBadge = (p) => {
    const map = { high: 'bg-red-50 text-red-500', medium: 'bg-amber-50 text-amber-600', low: 'bg-emerald-50 text-emerald-600' };
    return map[p] || map.medium;
  };

  // Workload bar data (simulated weekly distribution)
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayIdx = (new Date().getDay() + 6) % 7; // 0=Mon
  const barValues = [3, 5, 4, 7, 6, 2, 1]; // Simulated values

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-12 w-80 bg-[#594F4D]/10 rounded-xl"></div>
        <div className="grid grid-cols-4 gap-5">{[1,2,3,4].map(i => <div key={i} className="h-32 bg-[#F7F5F3] rounded-2xl"></div>)}</div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 h-72 bg-[#F7F5F3] rounded-2xl"></div>
          <div className="h-72 bg-[#F7F5F3] rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[32px] font-extrabold text-on-surface leading-tight tracking-[-0.02em]">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}
          </h2>
          <p className="text-[15px] text-outline mt-1">
            You have <span className="font-bold text-on-surface">{stats?.inProgressTasks || 0}</span> tasks in progress and <span className="font-bold text-error">{stats?.overdueTasks || 0}</span> overdue.
          </p>
        </div>
        <button className="px-6 py-3 bg-secondary text-white rounded-full flex items-center gap-2 text-sm font-bold shadow-[0_4px_16px_rgba(71,100,92,0.25)] hover:shadow-[0_6px_20px_rgba(71,100,92,0.35)] active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[20px]">insights</span>
          Daily Report
        </button>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard label="Total Tasks" value={stats?.totalTasks || 0} icon="task_alt" colorClass="bg-[#CC9966]/10 text-[#CC9966]" trend={12} trendLabel="vs last week" />
        <StatsCard label="In Progress" value={stats?.inProgressTasks || 0} icon="schedule" colorClass="bg-secondary/10 text-secondary" />
        <StatsCard label="Completed" value={stats?.doneTasks || 0} icon="check_circle" colorClass="bg-emerald-100 text-emerald-600" trend={8} trendLabel={`${stats?.completionRate || 0}% rate`} />
        <StatsCard label="Overdue" value={stats?.overdueTasks || 0} icon="warning" colorClass="bg-red-50 text-red-500" trend={-5} trendLabel="needs attention" />
      </section>

      {/* Workload Chart + Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Workload */}
        <div className="lg:col-span-2 bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-on-surface">My Workload</h3>
            <span className="px-4 py-1.5 bg-white/60 text-outline text-[11px] font-bold rounded-full border border-[#594F4D]/8">This Week</span>
          </div>
          {/* Bar Chart */}
          <div className="flex items-end gap-3 h-44 mb-4">
            {weekDays.map((day, i) => {
              const maxVal = Math.max(...barValues);
              const heightPct = maxVal > 0 ? (barValues[i] / maxVal) * 100 : 0;
              const isToday = i === todayIdx;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <span className={`text-[11px] font-bold ${isToday ? 'text-[#CC9966]' : 'text-outline/60'}`}>{barValues[i]}</span>
                  <div className="w-full relative">
                    <div
                      className={`w-full rounded-xl transition-all duration-500 ${isToday ? 'bg-[#CC9966] shadow-[0_4px_12px_rgba(204,153,102,0.3)]' : 'bg-[#594F4D]/8 hover:bg-[#594F4D]/15'}`}
                      style={{ height: `${Math.max(heightPct, 8)}%`, minHeight: '12px', maxHeight: '160px', height: `${heightPct * 1.5}px` }}
                    ></div>
                  </div>
                  <span className={`text-[11px] font-bold ${isToday ? 'text-[#CC9966]' : 'text-outline/50'}`}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)] flex flex-col">
          <h3 className="text-xl font-bold text-on-surface mb-6">Recent Activity</h3>
          <div className="space-y-1 flex-1">
            {activity.length === 0 ? (
              <p className="text-sm text-outline text-center py-8">No recent activity</p>
            ) : (
              activity.map((log) => <ActivityItem key={log._id} log={log} />)
            )}
          </div>
          <a href="/activity" className="block mt-4 py-2.5 border border-[#594F4D]/10 text-outline rounded-full text-[12px] font-bold hover:bg-white/50 transition-all text-center">
            View All Activity
          </a>
        </div>
      </section>

      {/* Overview Section Placeholder */}
      <div className="bg-[#F7F5F3] p-8 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)] text-center text-outline text-sm">
        Overview Section (To be updated)
      </div>

      {/* Upcoming Tasks */}
      <section className="bg-[#F7F5F3] p-7 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-on-surface">Upcoming Deadlines</h3>
          <a href="/analytics" className="text-[12px] font-bold text-primary hover:underline">View Kanban →</a>
        </div>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-left border-separate border-spacing-y-1.5" style={{ borderSpacing: '0 6px' }}>
            <thead>
              <tr className="text-[11px] font-bold text-outline uppercase tracking-[0.1em]">
                <th className="pb-2 px-4">Task</th>
                <th className="pb-2 px-4">Project</th>
                <th className="pb-2 px-4">Priority</th>
                <th className="pb-2 px-4">Due Date</th>
                <th className="pb-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-outline text-sm">No upcoming tasks</td></tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id} className="bg-white/50 hover:bg-white transition-colors cursor-pointer">
                    <td className="py-3.5 px-4 rounded-l-xl font-semibold text-[13px] text-on-surface">{task.title}</td>
                    <td className="py-3.5 px-4 text-outline text-[12px]">{task.project?.title || '—'}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-3 py-1 ${priorityBadge(task.priority)} text-[10px] font-bold rounded-full uppercase`}>{task.priority}</span>
                    </td>
                    <td className="py-3.5 px-4 text-outline text-[12px]">
                      {task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                    </td>
                    <td className="py-3.5 px-4 rounded-r-xl">
                      <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase">{task.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
