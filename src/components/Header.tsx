import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/flux-2026-01-21-20_20_05.png"
              alt="Market Sentinel"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold">
              <span className="text-white">MARKET</span>{' '}
              <span className="text-green-500">SENTINEL</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-gray-400 hover:text-white transition-colors">
              Probleme
            </a>
            <a href="#solution" className="text-gray-400 hover:text-white transition-colors">
              Solution
            </a>
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">
              Fonctionnalites
            </a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
              Tarifs
            </a>
          </nav>

          <Link
            to="/signup"
            className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-gray-950 font-semibold rounded-lg transition-all hover:scale-105"
          >
            Commencer
          </Link>
        </div>
      </div>
    </header>
  );
}
