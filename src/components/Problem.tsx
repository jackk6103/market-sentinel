import { AlertTriangle, Brain, TrendingDown } from 'lucide-react';

export function Problem() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Surcharge d'informations",
      description: "Des dizaines de sources, de news, d'indicateurs... Vous passez plus de temps à chercher qu'à analyser."
    },
    {
      icon: Brain,
      title: "Décisions émotionnelles",
      description: "La peur de rater une opportunité (FOMO) ou la panique face à une baisse vous font agir impulsivement."
    },
    {
      icon: TrendingDown,
      title: "Pertes évitables",
      description: "Agir dans des conditions défavorables (faible liquidité, forte volatilité) multiplie les risques de pertes."
    }
  ];

  return (
    <section id="problem" className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Le problème des <span className="text-red-500">décideurs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trop d'informations, pas assez de clarté. Résultat : des décisions précipitées et des pertes évitables.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-gray-900/50 border border-red-500/20 hover:border-red-500/40 transition-all backdrop-blur-sm group"
            >
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 w-fit group-hover:bg-red-500/20 transition-colors">
                <problem.icon className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-red-400">
                {problem.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Impact statement */}
        <div className="mt-16 p-8 rounded-xl neon-border-cyan bg-gray-900/30 backdrop-blur-sm text-center">
          <p className="text-2xl text-cyan-400 font-semibold">
            Sans une vue claire du contexte de marché, chaque décision devient un pari.
          </p>
        </div>
      </div>
    </section>
  );
}
