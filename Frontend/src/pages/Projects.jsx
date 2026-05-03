import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Modal from '../components/ui/Modal';
import { getInitials } from '../components/ui/ActivityItem';

// Reusable Project Card
const ProjectCard = ({ project }) => {
  const statusStyles = {
    'planning': { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Planning' },
    'in-progress': { bg: 'bg-[#CC9966]/10', text: 'text-[#CC9966]', label: 'In Progress' },
    'review': { bg: 'bg-secondary/10', text: 'text-secondary', label: 'Review' },
    'completed': { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Completed' },
  };
  const status = statusStyles[project.status] || statusStyles['planning'];

  const formatDate = (date) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-[#F7F5F3] p-6 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)] hover:shadow-[0_8px_24px_rgba(89,79,77,0.1)] transition-all duration-300 group flex flex-col border border-white/50">
      <div className="flex justify-between items-start mb-4">
        <span className={`${status.bg} ${status.text} px-3.5 py-1 rounded-full text-[11px] font-bold`}>{status.label}</span>
        <button className="text-outline/40 hover:text-outline transition-colors p-1 rounded-full hover:bg-white/60">
          <span className="material-symbols-outlined text-[20px]">more_horiz</span>
        </button>
      </div>
      <h3 className="font-bold text-[18px] text-on-surface mb-1.5 group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
      <p className="text-[12px] text-outline flex-1 mb-5 leading-relaxed line-clamp-2">{project.description || 'No description provided.'}</p>

      {/* Progress */}
      <div className="space-y-4 mt-auto">
        <div>
          <div className="flex justify-between text-[11px] font-bold text-outline mb-1.5">
            <span>Progress</span>
            <span className="text-on-surface">{project.progress || 0}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#594F4D]/8 rounded-full overflow-hidden">
            <div className="h-full bg-[#CC9966] rounded-full transition-all duration-700" style={{ width: `${project.progress || 0}%` }}></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-1">
          <div className="flex -space-x-2">
            {(project.members || []).slice(0, 3).map((member, i) => (
              <div key={member._id || i} className="w-7 h-7 rounded-full border-2 border-[#F7F5F3] bg-surface-container-high flex items-center justify-center text-[9px] font-bold text-on-surface-variant" title={member.name}>
                {getInitials(member.name)}
              </div>
            ))}
            {(project.members || []).length > 3 && (
              <div className="w-7 h-7 rounded-full border-2 border-[#F7F5F3] bg-[#CC9966]/10 flex items-center justify-center text-[9px] font-bold text-[#CC9966]">
                +{project.members.length - 3}
              </div>
            )}
          </div>
          <span className="flex items-center gap-1 text-outline text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            {formatDate(project.deadline)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton
const ProjectSkeleton = () => (
  <div className="bg-[#F7F5F3] p-6 rounded-2xl shadow-[0_2px_12px_rgba(89,79,77,0.06)] animate-pulse flex flex-col border border-white/50">
    <div className="flex justify-between mb-4"><div className="h-6 w-20 bg-[#594F4D]/8 rounded-full"></div><div className="h-5 w-5 bg-[#594F4D]/8 rounded-full"></div></div>
    <div className="h-5 w-3/4 bg-[#594F4D]/8 rounded-lg mb-2"></div>
    <div className="h-3 w-full bg-[#594F4D]/5 rounded-lg mb-1.5"></div>
    <div className="h-3 w-2/3 bg-[#594F4D]/5 rounded-lg mb-5"></div>
    <div className="mt-auto space-y-4">
      <div className="h-1.5 w-full bg-[#594F4D]/8 rounded-full"></div>
      <div className="flex justify-between"><div className="flex -space-x-1">{[1,2].map(i=><div key={i} className="w-7 h-7 bg-[#594F4D]/8 rounded-full"></div>)}</div><div className="h-4 w-14 bg-[#594F4D]/8 rounded-lg"></div></div>
    </div>
  </div>
);

// Main Projects Page
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', status: 'planning', deadline: '', members: [] });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes] = await Promise.all([API.get('/projects')]);
        setProjects(projRes.data);
      } catch (err) { console.error(err); }
      try { const { data } = await API.get('/users'); setUsers(data); } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      const payload = { ...form };
      if (payload.deadline) payload.deadline = new Date(payload.deadline).toISOString();
      else delete payload.deadline;
      const { data } = await API.post('/projects', payload);
      setProjects(prev => [data, ...prev]);
      setModalOpen(false);
      setForm({ title: '', description: '', status: 'planning', deadline: '', members: [] });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  const toggleMember = (id) => {
    setForm(prev => ({
      ...prev,
      members: prev.members.includes(id) ? prev.members.filter(m => m !== id) : [...prev.members, id]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-[28px] font-extrabold text-on-surface leading-tight tracking-[-0.02em]">Active Projects</h1>
            {!loading && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[11px] font-bold">{projects.length}</span>
            )}
          </div>
          <button onClick={() => setModalOpen(true)} className="bg-[#CC9966] text-white px-6 py-3 rounded-full font-bold text-[13px] shadow-[0_6px_24px_rgba(204,153,102,0.3)] active:scale-95 transition-all flex items-center gap-2 hover:shadow-[0_8px_32px_rgba(204,153,102,0.4)]">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Project
          </button>
        </div>
        <p className="text-[14px] text-outline leading-relaxed">Track your team's progress and coordinate high-impact initiatives.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
        {loading ? (
          <>{[1,2,3].map(i => <ProjectSkeleton key={i} />)}</>
        ) : (
          <>
            {projects.map(p => <ProjectCard key={p._id} project={p} />)}
            {/* New Initiative */}
            <button onClick={() => setModalOpen(true)} className="border-2 border-dashed border-[#594F4D]/12 p-6 rounded-2xl hover:bg-white/30 hover:border-[#CC9966]/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 group min-h-[240px]">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_2px_8px_rgba(89,79,77,0.06)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#CC9966] text-[28px]">add</span>
              </div>
              <div className="text-center">
                <p className="font-bold text-[16px] text-on-surface">New Initiative</p>
                <p className="text-[12px] text-outline mt-1">Click to start a fresh project</p>
              </div>
            </button>
          </>
        )}
      </div>

      {/* Create Project Modal */}
      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setError(''); }} title="New Project" maxWidth={580}>
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>{error}
          </div>
        )}
        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Title *</label>
            <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-white border border-[#594F4D]/10 rounded-xl px-4 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-[#CC9966]/40 focus:border-transparent outline-none transition-all placeholder:text-[#594F4D]/30" placeholder="Project name" required />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full bg-white border border-[#594F4D]/10 rounded-xl px-4 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-[#CC9966]/40 focus:border-transparent outline-none transition-all resize-none h-24 placeholder:text-[#594F4D]/30" placeholder="Brief description..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-white border border-[#594F4D]/10 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#CC9966]/40 outline-none transition-all">
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Deadline</label>
              <input type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="w-full bg-white border border-[#594F4D]/10 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#CC9966]/40 outline-none transition-all" />
            </div>
          </div>
          {users.length > 0 && (
            <div>
              <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Team Members</label>
              <div className="flex flex-wrap gap-2">
                {users.map(u => (
                  <button key={u._id} type="button" onClick={() => toggleMember(u._id)} className={`px-3.5 py-2 rounded-full text-[11px] font-bold transition-all ${form.members.includes(u._id) ? 'bg-[#CC9966] text-white shadow-sm' : 'bg-white text-outline border border-[#594F4D]/10 hover:border-[#CC9966]/30'}`}>
                    {u.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button type="submit" disabled={creating} className="w-full bg-[#CC9966] text-white py-3.5 rounded-full font-bold text-sm shadow-[0_6px_24px_rgba(204,153,102,0.3)] active:scale-[0.98] transition-all disabled:opacity-60 mt-2">
            {creating ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Projects;
