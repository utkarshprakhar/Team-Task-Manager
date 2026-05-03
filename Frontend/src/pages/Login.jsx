import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFECE9] flex items-center justify-center px-4 py-8">
      <div className="w-full mx-auto" style={{ maxWidth: '448px' }}>
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#CC9966] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_8px_24px_rgba(204,153,102,0.3)]">
            <span className="material-symbols-outlined text-white text-4xl">task_alt</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#594F4D]">Karya</h1>
          <p className="text-[11px] font-bold text-[#594F4D]/40 uppercase tracking-[0.25em] mt-1">Smarter Workflows</p>
        </div>

        {/* Card */}
        <div className="bg-[#F7F5F3] rounded-3xl p-8 shadow-[0_12px_40px_rgba(89,79,77,0.08)]">
          <h2 className="text-2xl font-extrabold text-on-surface mb-1.5">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-outline mb-8 leading-relaxed">
            {isRegister ? 'Sign up to start managing your projects.' : 'Sign in to continue to your dashboard.'}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#594F4D]/10 rounded-xl px-4 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-[#CC9966]/40 focus:border-transparent outline-none transition-all placeholder:text-[#594F4D]/30"
                  placeholder="Alex Rivera"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#594F4D]/10 rounded-xl px-4 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-[#CC9966]/40 focus:border-transparent outline-none transition-all placeholder:text-[#594F4D]/30"
                placeholder="you@karya.io"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-outline uppercase tracking-[0.12em] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#594F4D]/10 rounded-xl px-4 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-[#CC9966]/40 focus:border-transparent outline-none transition-all placeholder:text-[#594F4D]/30"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#CC9966] text-white py-3.5 rounded-full font-bold text-sm shadow-[0_6px_24px_rgba(204,153,102,0.35)] hover:shadow-[0_8px_32px_rgba(204,153,102,0.45)] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Please wait...
                </span>
              ) : (
                isRegister ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-sm text-primary hover:underline font-semibold"
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 pt-6 border-t border-[#594F4D]/8">
            <p className="text-[10px] font-bold text-outline/60 uppercase tracking-[0.15em] text-center mb-3">Demo Accounts</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/60 p-3.5 rounded-xl">
                <p className="font-bold text-[12px] text-on-surface mb-1">Admin</p>
                <p className="text-[11px] text-outline leading-relaxed">alex@karya.io</p>
                <p className="text-[11px] text-outline">admin123</p>
              </div>
              <div className="bg-white/60 p-3.5 rounded-xl">
                <p className="font-bold text-[12px] text-on-surface mb-1">Member</p>
                <p className="text-[11px] text-outline leading-relaxed">sarah@karya.io</p>
                <p className="text-[11px] text-outline">member123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
