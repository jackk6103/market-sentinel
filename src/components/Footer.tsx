import { Mail, Twitter, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/flux-2026-01-21-20_20_05.png"
                alt="Market Sentinel"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">
                <span className="text-white">MARKET</span>{' '}
                <span className="text-green-500">SENTINEL</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              L'assistant intelligent qui vous aide à prendre de meilleures décisions de trading
              en analysant le contexte de marché en temps réel.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-green-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-green-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-green-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Produit</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-green-500 transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Tarifs</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Entreprise</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-green-500 transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Mentions légales</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-900 text-center text-gray-500 text-sm">
          <p>
            2026 Market Sentinel. Tous droits reserves.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> | </span>
            Le trading comporte des risques. Tradez de manière responsable.
          </p>
        </div>
      </div>
    </footer>
  );
}
