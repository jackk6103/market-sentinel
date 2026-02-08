import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TRADING_CATEGORIES } from '../utils/tradingAssets';
import {
  LayoutDashboard,
  History,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('tradingCategory') || 'forex';
  });
  const { signOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('tradingCategory', selectedCategory);
    window.dispatchEvent(new CustomEvent('categoryChange', { detail: selectedCategory }));
  }, [selectedCategory]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Historique', href: '/dashboard/history', icon: History },
    { name: 'Alertes', href: '/dashboard/alerts', icon: Bell },
    { name: 'Profil', href: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex h-screen">
        <div
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-800">
              <Link to="/dashboard" className="flex items-center gap-3">
                <img
                  src="/flux-2026-01-21-20_20_05.png"
                  alt="Market Sentinel"
                  className="w-10 h-10 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold">
                    <span className="text-white">MARKET</span>{' '}
                    <span className="text-green-500">SENTINEL</span>
                  </span>
                </div>
              </Link>
            </div>

            <div className="p-4 border-b border-gray-800">
              <label className="block text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
                Categorie de Trading
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TRADING_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center gap-2 px-3 py-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-green-500/20 border-2 border-green-500 text-green-500'
                        : 'bg-gray-800/50 border-2 border-gray-700 text-gray-400 hover:bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-xs font-semibold text-center leading-tight">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-500/10 text-green-500'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.email || 'Mode Demo'}
                  </p>
                </div>
              </div>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Deconnexion</span>
                </button>
              ) : (
                <Link
                  to="/signup"
                  className="w-full flex items-center gap-3 px-4 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors text-center justify-center"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Creer un compte</span>
                </Link>
              )}
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          {!user && (
            <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-b border-cyan-500/30 px-6 py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-cyan-400">
                  Vous etes en mode demo. Creez un compte pour sauvegarder vos analyses et parametres.
                </p>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-gray-950 font-semibold rounded text-sm transition-all"
                >
                  Creer un compte
                </Link>
              </div>
            </div>
          )}

          <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden text-gray-400 hover:text-white"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <h1 className="text-xl font-bold text-white">
                    {navigation.find((item) => item.href === location.pathname)?.name || 'Dashboard'}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {user && (
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-500 font-medium">Essai gratuit actif</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
