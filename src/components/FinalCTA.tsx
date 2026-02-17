import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-cyan-500/20 to-green-500/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent_70%)]"></div>

          <div className="relative p-12 md:p-16 text-center">
            <div className="flex justify-center mb-8">
              <img
                src="/Market-Sentinel_Logo_-_Emblem_Design,_Shield_Icon.png"
                alt="Market Sentinel"
                className="w-24 h-24 object-contain"
              />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Pret a décider plus
              <br />
              <span className="gradient-text">intelligemment ?</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Arretez de prendre des decisions a l'aveugle.
              Laissez <span className="text-white font-semibold">Market</span>{' '}
              <span className="text-green-500 font-semibold">Sentinel</span> analyser le marche pour vous.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/signup"
                className="group px-8 py-4 bg-green-500 hover:bg-green-600 text-gray-950 font-semibold rounded-lg transition-all glow-green hover:scale-105 flex items-center gap-2"
              >
                Commencer maintenant - 29€/mois
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#solution"
                className="px-8 py-4 neon-border-cyan bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm text-cyan-400 font-semibold rounded-lg transition-all hover:scale-105 inline-block"
              >
                En savoir plus
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Pas de carte bancaire requise</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span>Acces instantane</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Support dedie</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Market Sentinel est un outil d'aide a la decision.
            <br />
            Les investissements comportent des risques. Investissez de maniere responsable.
          </p>
        </div>
      </div>
    </section>
  );
}
