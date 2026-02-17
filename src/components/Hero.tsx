import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/Market-Sentinel_Logo_-_Emblem_Design,_Shield_Icon.png"
            alt="Market Sentinel Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
          />
        </div>

        {/* Brand name */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="text-white">MARKET</span>{' '}
          <span className="text-green-500">SENTINEL</span>
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8">
          L'Agent IA qui vous dit{' '}
          <span className="gradient-text">quand vous ABSTENIR</span>
        </p>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Prenez de meilleures décisions d'investissement, sans émotion, sans intuition aveugle,
          sans précipitation. <span className="text-cyan-400">Décidez avant d'agir.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            to="/signup"
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-gray-950 font-semibold rounded-lg transition-all glow-green hover:scale-105 inline-block"
          >
            Commencer maintenant - 29€/mois
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-4 neon-border-cyan bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm text-cyan-400 font-semibold rounded-lg transition-all hover:scale-105 inline-block"
          >
            Essayer la demo
          </Link>
        </div>

        {/* Scroll indicator */}
        <a
          href="#problem"
          className="animate-bounce text-gray-500 hover:text-green-500 transition-colors block"
        >
          <ChevronDown className="w-8 h-8 mx-auto" />
        </a>
      </div>
    </section>
  );
}
