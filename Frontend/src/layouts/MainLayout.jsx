import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopAppBar from '../components/TopAppBar';
import Modal from '../components/ui/Modal';
import API from '../api/axios';

const MainLayout = ({ children, title }) => {
  const [taskModal, setTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', priority: 'medium' });
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    // Quick task creation is a placeholder — requires a project selection
    setLoading(true);
    try {
      // For now, close modal. Full implementation needs project picker.
      setTaskModal(false);
      setTaskForm({ title: '', description: '', priority: 'medium' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#EFECE9]">
      <Sidebar />
      <main className="ml-72 flex-1 w-full p-[32px]">
        <TopAppBar title={title} />
        {children}

        {/* Floating Create Task Button */}
        <button
          onClick={() => setTaskModal(true)}
          className="fixed bottom-10 right-10 w-14 h-14 bg-[#CC9966] text-white rounded-full flex items-center justify-center shadow-[0_6px_24px_rgba(204,153,102,0.4)] hover:shadow-[0_8px_32px_rgba(204,153,102,0.5)] hover:scale-105 active:scale-95 transition-all z-50 group"
        >
          <span className="material-symbols-outlined text-[28px]">add</span>
          <span className="absolute right-full mr-3 bg-[#352f2b] text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Create Task
          </span>
        </button>

        {/* Create Task Modal */}
        <Modal isOpen={taskModal} onClose={() => setTaskModal(false)} title="Quick Task">
          <form onSubmit={handleCreateTask} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Task Title *</label>
              <input
                type="text"
                value={taskForm.title}
                onChange={e => setTaskForm(p => ({ ...p, title: e.target.value }))}
                className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:ring-2 focus:ring-[#CC9966]/40 focus:border-transparent outline-none transition-all"
                placeholder="What needs to be done?"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Description</label>
              <textarea
                value={taskForm.description}
                onChange={e => setTaskForm(p => ({ ...p, description: e.target.value }))}
                className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:ring-2 focus:ring-[#CC9966]/40 focus:border-transparent outline-none transition-all resize-none h-20"
                placeholder="Add details..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Priority</label>
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTaskForm(prev => ({ ...prev, priority: p }))}
                    className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${taskForm.priority === p ? 'bg-[#CC9966] text-white shadow-sm' : 'bg-white text-outline border border-outline-variant/30 hover:border-[#CC9966]/40'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-outline italic">💡 Full task creation with project assignment is available on the Projects page.</p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#CC9966] text-white py-3 rounded-full font-semibold text-sm shadow-lg shadow-[#CC9966]/20 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </form>
        </Modal>
      </main>
    </div>
  );
};

export default MainLayout;
