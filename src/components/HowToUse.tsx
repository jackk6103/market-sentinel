import { LogIn, Eye, Brain, CheckCircle } from 'lucide-react';

export function HowToUse() {
  const steps = [
    {
      number: "01",
      icon: LogIn,
      title: "Connectez-vous",
      description: "Accedez a Market Sentinel en quelques secondes. Pas de configuration compliquee.",
      color: "green"
    },
    {
      number: "02",
      icon: Eye,
      title: "Consultez la synthese",
      description: "Visualisez instantanement l'etat du marche, le niveau de risque, la volatilite et la liquidite.",
      color: "cyan"
    },
    {
      number: "03",
      icon: Brain,
      title: "Analysez le contexte",
      description: "Prenez le temps de comprendre les conditions actuelles avant de prendre une decision.",
      color: "green"
    },
    {
      number: "04",
      icon: CheckCircle,
      title: "Decidez en connaissance de cause",
      description: "Agissez uniquement quand les conditions sont favorables, ou abstenez-vous si elles ne le sont pas.",
      color: "cyan"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comment utiliser{' '}
            <span className="text-white">Market</span>{' '}
            <span className="text-green-500">Sentinel</span> ?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Quatre etapes simples pour integrer Market Sentinel dans votre routine de prise de décision.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/30 via-cyan-500/30 to-green-500/30 transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex-1 p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 p-3 rounded-lg ${
                        step.color === 'green' ? 'neon-border-green bg-green-500/10' : 'neon-border-cyan bg-cyan-500/10'
                      }`}
                    >
                      <step.icon
                        className={`w-6 h-6 ${
                          step.color === 'green' ? 'text-green-500' : 'text-cyan-500'
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-full neon-border-green bg-gray-900 flex items-center justify-center">
                    <span className="text-3xl font-bold gradient-text">{step.number}</span>
                  </div>
                </div>

                <div className="hidden lg:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center p-8 rounded-xl neon-border-cyan bg-gray-900/30 backdrop-blur-sm">
          <p className="text-xl text-cyan-400 font-semibold mb-2">
            Simple, rapide, et efficace.
          </p>
          <p className="text-gray-400">
            Integrez Market Sentinel dans votre routine en quelques minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
