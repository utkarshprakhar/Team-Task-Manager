import React from 'react';

const Kanban = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Kanban Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-semibold text-outline mb-2">
            <span>Projects</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-primary font-bold">Productivity Redesign 2024</span>
          </nav>
          <h1 className="font-h1 text-[32px] font-bold text-on-surface">Productivity Redesign 2024</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-4 border-background object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0ugNZt95QnuzyIcjDXn1kOBi-k0G7djeFpTdP9PrSNpOL_SnTG4jKntL5yt3i6sj_Vd8d0ZzhGFlidM_uGjgSzjFp6aO-Kr5zM8l9EgHJ5gMCZi5lvTpkug2DS2jvzM0ghxWptUT_rtw5rXUH01x-IlljWB1UsRsXL0NvytX00EwXmldRYWDQfZdbPJxBALM4Rj4NdEPyV8Q2jnKa9TcYyxIlWiMKpHEom6NDulMhp_tc-R0uCU4lAZtGVC_vUBwyozH0bKF5R8xgg" alt="Team member" />
              <div className="w-10 h-10 rounded-full border-4 border-background bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">JS</div>
              <div className="w-10 h-10 rounded-full border-4 border-background bg-tertiary-container flex items-center justify-center text-on-tertiary-container font-bold text-xs">AM</div>
              <div className="w-10 h-10 rounded-full border-4 border-background bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold text-xs">+4</div>
            </div>
            <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline transition-all">
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Invite Team
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface-container-low p-1 rounded-full">
            <button className="px-4 py-2 rounded-full bg-white shadow-sm text-sm font-bold text-primary transition-all">Board</button>
            <button className="px-4 py-2 rounded-full text-sm font-medium text-outline hover:text-on-surface transition-all">List</button>
            <button className="px-4 py-2 rounded-full text-sm font-medium text-outline hover:text-on-surface transition-all">Timeline</button>
          </div>
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant transition-all">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </section>

      {/* Kanban Board */}
      <section className="flex-1 overflow-x-auto custom-scrollbar pb-8">
        <div className="flex gap-6 h-full min-w-max">
          {/* TO DO COLUMN */}
          <div className="w-80 flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-outline"></span>
                <h3 className="font-semibold text-sm uppercase tracking-widest text-outline">TO DO</h3>
                <span className="bg-surface-container-high px-2 py-0.5 rounded-full text-[10px] font-bold text-outline">4</span>
              </div>
              <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2 pb-4">
              {/* Card 1 */}
              <div className="bg-[#F7F5F3] p-6 rounded-xl shadow-[0px_10px_30px_rgba(89,79,77,0.05)] hover:shadow-[0px_15px_35px_rgba(89,79,77,0.12)] transition-all duration-300 border border-transparent hover:border-primary-container/20 group">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-error-container text-on-error-container rounded-full text-[10px] font-bold uppercase tracking-wider">High</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-outline"><span className="material-symbols-outlined text-sm">edit</span></button>
                </div>
                <h4 className="font-bold text-[16px] text-on-surface mb-2">Define user persona & journey map</h4>
                <p className="text-sm text-outline mb-4 line-clamp-2">Research and document the primary user types and their core workflows through the new redesign.</p>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span className="text-[10px] font-medium">Oct 12</span>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-secondary-container border-2 border-[#F7F5F3] flex items-center justify-center text-[8px] font-bold">JS</div>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-[#F7F5F3] p-6 rounded-xl shadow-[0px_10px_30px_rgba(89,79,77,0.05)] hover:shadow-[0px_15px_35px_rgba(89,79,77,0.12)] transition-all duration-300 border border-transparent hover:border-primary-container/20 group">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-wider">Medium</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-outline"><span className="material-symbols-outlined text-sm">edit</span></button>
                </div>
                <h4 className="font-bold text-[16px] text-on-surface mb-2">Competitor Analysis</h4>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span className="text-[10px] font-medium">Oct 14</span>
                  </div>
                  <img className="w-6 h-6 rounded-full border-2 border-[#F7F5F3] object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0ugNZt95QnuzyIcjDXn1kOBi-k0G7djeFpTdP9PrSNpOL_SnTG4jKntL5yt3i6sj_Vd8d0ZzhGFlidM_uGjgSzjFp6aO-Kr5zM8l9EgHJ5gMCZi5lvTpkug2DS2jvzM0ghxWptUT_rtw5rXUH01x-IlljWB1UsRsXL0NvytX00EwXmldRYWDQfZdbPJxBALM4Rj4NdEPyV8Q2jnKa9TcYyxIlWiMKpHEom6NDulMhp_tc-R0uCU4lAZtGVC_vUBwyozH0bKF5R8xgg" alt="Small avatar" />
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-3 bg-surface-container-low border-2 border-dashed border-outline-variant/40 text-outline hover:text-primary hover:border-primary-container/40 hover:bg-surface-container rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add Task
            </button>
          </div>

          {/* IN PROGRESS COLUMN */}
          <div className="w-80 flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <h3 className="font-semibold text-sm uppercase tracking-widest text-primary">IN PROGRESS</h3>
                <span className="bg-primary-fixed-dim/20 px-2 py-0.5 rounded-full text-[10px] font-bold text-primary">2</span>
              </div>
              <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2 pb-4">
              {/* Card 3 */}
              <div className="bg-[#F7F5F3] p-6 rounded-xl shadow-[0px_10px_30px_rgba(89,79,77,0.05)] hover:shadow-[0px_15px_35px_rgba(89,79,77,0.12)] transition-all duration-300 border border-transparent hover:border-primary-container/20 group">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-error-container text-on-error-container rounded-full text-[10px] font-bold uppercase tracking-wider">High</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-outline"><span className="material-symbols-outlined text-sm">edit</span></button>
                </div>
                <h4 className="font-bold text-[16px] text-on-surface mb-2">Refine UI Design System</h4>
                <div className="w-full bg-outline-variant/20 rounded-full h-1.5 mb-4">
                  <div className="bg-primary h-1.5 rounded-full w-[65%]"></div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-outline">
                      <span className="material-symbols-outlined text-sm">chat_bubble_outline</span>
                      <span className="text-[10px] font-medium">8</span>
                    </div>
                    <div className="flex items-center gap-1 text-outline">
                      <span className="material-symbols-outlined text-sm">attach_file</span>
                      <span className="text-[10px] font-medium">12</span>
                    </div>
                  </div>
                  <img className="w-6 h-6 rounded-full border-2 border-[#F7F5F3] object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0uiRzvXAHk3p3eWyomOWXUL9zXbpypZ6jwHuFGjbD1SJaY-JIpU01O7oGLu5EH8QtV1DyjBkYKc3bUqCXuFRZL0aGfvywH3UD7Eqk4xohSaFTdw5bEdfjftLRCX6gH8cEGjmi2KUvJEt-u6TdZEjelXWDqHaIcPL-56G9hpmPrMPUqPggMdSb635pxtSiFcsS1nUclWqX3qyQI-tDCIYesOnt4_VsDtW5mvRZTzIX6kZyV0GGibBl7OTyUM-AezYF6ULXsIdWdwZNw" alt="Small avatar" />
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-3 bg-surface-container-low border-2 border-dashed border-outline-variant/40 text-outline hover:text-primary hover:border-primary-container/40 hover:bg-surface-container rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add Task
            </button>
          </div>

          {/* REVIEW COLUMN */}
          <div className="w-80 flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <h3 className="font-semibold text-sm uppercase tracking-widest text-secondary">REVIEW</h3>
                <span className="bg-secondary-fixed/50 px-2 py-0.5 rounded-full text-[10px] font-bold text-on-secondary-fixed-variant">1</span>
              </div>
              <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2 pb-4">
              {/* Card 4 */}
              <div className="bg-[#F7F5F3] p-6 rounded-xl shadow-[0px_10px_30px_rgba(89,79,77,0.05)] hover:shadow-[0px_15px_35px_rgba(89,79,77,0.12)] transition-all duration-300 border border-transparent hover:border-primary-container/20 group">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">Low</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-outline"><span className="material-symbols-outlined text-sm">edit</span></button>
                </div>
                <h4 className="font-bold text-[16px] text-on-surface mb-2">Finalize color tokens</h4>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span className="text-[10px] font-medium">Today</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-tertiary-container border-2 border-[#F7F5F3] flex items-center justify-center text-[8px] font-bold">AM</div>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-3 bg-surface-container-low border-2 border-dashed border-outline-variant/40 text-outline hover:text-primary hover:border-primary-container/40 hover:bg-surface-container rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add Task
            </button>
          </div>

          {/* DONE COLUMN */}
          <div className="w-80 flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-on-tertiary-fixed-variant"></span>
                <h3 className="font-semibold text-sm uppercase tracking-widest text-on-tertiary-fixed-variant">DONE</h3>
                <span className="bg-surface-container-highest px-2 py-0.5 rounded-full text-[10px] font-bold text-outline">12</span>
              </div>
              <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2 pb-4 opacity-70 grayscale-[0.3]">
              {/* Card 5 (Done) */}
              <div className="bg-[#F7F5F3] p-6 rounded-xl shadow-none border border-outline-variant/20 group">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider line-through">Complete</span>
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                </div>
                <h4 className="font-bold text-[16px] text-on-surface-variant mb-2 line-through">Draft project proposal</h4>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">event_available</span>
                    <span className="text-[10px] font-medium">Finished Oct 5</span>
                  </div>
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-secondary-container border border-white flex items-center justify-center text-[7px] font-bold">JS</div>
                    <div className="w-5 h-5 rounded-full bg-tertiary-container border border-white flex items-center justify-center text-[7px] font-bold">AM</div>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-3 bg-surface-container-low border-2 border-dashed border-outline-variant/40 text-outline hover:text-primary hover:border-primary-container/40 hover:bg-surface-container rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add Task
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kanban;
