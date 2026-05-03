import React from 'react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 540 }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1f1b17]/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#F7F5F3] rounded-2xl w-full shadow-[0_20px_60px_rgba(89,79,77,0.2)] flex flex-col" style={{ maxWidth: `${maxWidth}px`, maxHeight: '90vh' }}>
        <div className="flex justify-between items-center p-6 pb-0">
          <h2 className="text-xl font-bold text-on-surface">{title}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-[#594F4D]/5 rounded-full transition-colors">
            <span className="material-symbols-outlined text-[20px] text-outline">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
