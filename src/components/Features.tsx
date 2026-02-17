import { Activity, Shield, Droplets, Gauge, CheckCircle } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Activity,
      title: "État du marché",
      description: "Analyse en temps réel des conditions générales du marché : tendance, momentum, sentiment.",
      color: "green"
    },
    {
      icon: Shield,
      title: "Niveau de risque",
      description: "Évaluation objective du niveau de risque actuel basée sur la volatilité historique et les événements récents.",
      color: "cyan"
    },
    {
      icon: Gauge,
      title: "Volatilité",
      description: "Mesure précise de l'instabilité des prix pour anticiper les mouvements brusques et protéger vos positions.",
      color: "green"
    },
    {
      icon: Droplets,
      title: "Liquidité",
      description: "Analyse du volume d'échanges pour identifier les moments où entrer ou sortir sans impacter le marché.",
      color: "cyan"
    },
    {
      icon: CheckCircle,
      title: "Recommandation neutre",
      description: "Synthèse claire et objective : conditions favorables, acceptables, ou défavorables pour prendre position.",
      color: "green"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div id="features" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ce que <span className="text-white">Market</span>{' '}
            <span className="text-green-500">Sentinel</span>{' '}
            <span className="gradient-text">analyse</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Des indicateurs cles pour une vision complete et actionnable du marche.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl ${
                feature.color === 'green' ? 'neon-border-green' : 'neon-border-cyan'
              } bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all group`}
            >
              <div
                className={`mb-6 p-3 rounded-lg ${
                  feature.color === 'green' ? 'bg-green-500/10' : 'bg-cyan-500/10'
                } w-fit group-hover:${
                  feature.color === 'green' ? 'bg-green-500/20' : 'bg-cyan-500/20'
                } transition-colors`}
              >
                <feature.icon
                  className={`w-8 h-8 ${
                    feature.color === 'green' ? 'text-green-500' : 'text-cyan-500'
                  }`}
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-400">
            Market Sentinel analyse et presente toutes ces donnees de maniere
            <span className="text-green-500 font-semibold"> simple et actionnable</span>,
            sans jargon technique inutile.
          </p>
        </div>
      </div>
    </section>
  );
}
