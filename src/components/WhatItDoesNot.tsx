import { XCircle, DollarSign, Zap, TrendingUp, AlertCircle } from 'lucide-react';

export function WhatItDoesNot() {
  const notFeatures = [
    {
      icon: Zap,
      title: "Ne trade pas automatiquement",
      description: "Market Sentinel ne passe aucun ordre. La decision finale reste toujours entre vos mains."
    },
    {
      icon: DollarSign,
      title: "Ne promet aucun gain",
      description: "Market Sentinel ne garantit pas de profits. Il fournit des informations, pas des promesses."
    },
    {
      icon: TrendingUp,
      title: "Ne donne pas de signaux d'achat/vente",
      description: "Market Sentinel evalue le contexte, il ne vous dit pas quel actif acheter ou vendre."
    },
    {
      icon: AlertCircle,
      title: "Ne remplace pas votre strategie",
      description: "C'est un outil d'aide a la decision, pas une strategie de trading cle en main."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 mb-6">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-400 font-semibold">Transparence & Ethique</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ce que <span className="text-white">Market</span>{' '}
            <span className="text-green-500">Sentinel</span>{' '}
            <span className="text-red-400">NE fait PAS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Pas de promesses irrealistes, pas d'automatisation dangereuse.
            Seulement de l'information claire pour vous aider a decider.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {notFeatures.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-red-500/30 transition-all backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-red-500/10">
                  <item.icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-red-400">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/5 to-cyan-500/5 backdrop-blur-sm text-center">
          <h3 className="text-2xl font-bold mb-4 text-green-400">
            Notre engagement : securite et responsabilite
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Market Sentinel est concu pour renforcer votre processus de decision,
            pas pour le remplacer. Vous gardez le controle total de vos trades et de votre capital.
            Nous valorisons la transparence et refusons toute promesse de gains garantis.
          </p>
        </div>
      </div>
    </section>
  );
}
