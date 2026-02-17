import { Bot, Sparkles, Target, Brain } from 'lucide-react';

export function Solution() {
  return (
    <section id="solution" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border-green bg-gray-900/50 mb-6">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span className="text-green-500 font-semibold">La Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">MARKET</span>{' '}
            <span className="text-green-500">SENTINEL</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Votre assistant de veille de marche qui analyse le contexte en temps reel
            et vous dit clairement quand NE PAS agir.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="p-8 rounded-2xl neon-border-cyan bg-gray-900/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <Bot className="w-12 h-12 text-cyan-500" />
                <div>
                  <h3 className="text-2xl font-bold">Analyse en temps reel</h3>
                  <p className="text-gray-400">Donnees structurees et actionnables</p>
                </div>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div className="p-4 bg-gray-950/80 rounded-lg border border-green-500/30">
                  <div className="text-gray-500 mb-1">Etat du marche</div>
                  <div className="text-green-500 font-semibold">FAVORABLE</div>
                </div>
                <div className="p-4 bg-gray-950/80 rounded-lg border border-yellow-500/30">
                  <div className="text-gray-500 mb-1">Niveau de risque</div>
                  <div className="text-yellow-500 font-semibold">MODERE</div>
                </div>
                <div className="p-4 bg-gray-950/80 rounded-lg border border-cyan-500/30">
                  <div className="text-gray-500 mb-1">Volatilite</div>
                  <div className="text-cyan-500 font-semibold">STABLE</div>
                </div>
                <div className="p-4 bg-gray-950/80 rounded-lg border border-green-500/30">
                  <div className="text-gray-500 mb-1">Liquidite</div>
                  <div className="text-green-500 font-semibold">ELEVEE</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg neon-border-green bg-gray-900/50 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Synthese structuree</h3>
                <p className="text-gray-400">
                  Plus besoin de chercher dans des dizaines de sources. Market Sentinel collecte,
                  analyse et synthetise toutes les donnees pertinentes en un seul endroit.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg neon-border-cyan bg-gray-900/50 flex items-center justify-center">
                <Brain className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Decisions objectives</h3>
                <p className="text-gray-400">
                  Base uniquement sur des donnees factuelles, sans biais emotionnels.
                  Vous savez exactement dans quelles conditions vous vous engagez.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg neon-border-green bg-gray-900/50 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Gagnez du temps</h3>
                <p className="text-gray-400">
                  Concentrez-vous sur votre strategie, pas sur la collecte d'informations.
                  Market Sentinel fait la veille pour vous.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center p-8 rounded-xl bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20">
          <p className="text-2xl font-semibold text-gray-100 mb-2">
            Market Sentinel n'investit pas. Il vous aide a décider mieux.
          </p>
          <p className="text-gray-400">
            En vous donnant le contexte necessaire pour decider en toute connaissance de cause.
          </p>
        </div>
      </div>
    </section>
  );
}
