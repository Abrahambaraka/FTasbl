
import React, { useState } from 'react';
import { Lock, LogIn, ShieldCheck, AlertCircle } from 'lucide-react';


interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            if (password === 'FTasbl@20025') {
                onLoginSuccess();
            } else {
                setError('Mot de passe incorrect.');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-500">
                <div className="p-6 md:p-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <ShieldCheck size={24} />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Accès Admin</h2>
                        <p className="text-xs text-slate-500 mt-2">Veuillez entrer le mot de passe de la fondation.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Clé d'Accès</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                                    placeholder="••••••••"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-[11px] font-medium animate-in slide-in-from-top-2">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 text-sm"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <LogIn size={16} />
                                    Accéder au Panel
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                        Fondation TUSAIDIYANE (ASBL) • Lubumbashi
                    </p>
                </div>
            </div>
        </div>
    );
};


export default Login;
