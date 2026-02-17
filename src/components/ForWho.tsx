import { Users, Clock, Target, BookOpen } from 'lucide-react';

export function ForWho() {
  const profiles = [
    {
      icon: Clock,
      title: "Investisseurs actifs",
      description: "Vous avez besoin de savoir instantanement si les conditions sont favorables pour prendre position."
    },
    {
      icon: Target,
      title: "Traders & Investisseurs",
      description: "Vous cherchez a optimiser vos points d'entree et de sortie en fonction du contexte de marche."
    },
    {
      icon: BookOpen,
      title: "Débutants sur les marchés",
      description: "Vous voulez apprendre a lire le marche sans vous laisser submerger par trop d'informations."
    },
    {
      icon: Users,
      title: "Professionnels expérimentés",
      description: "Vous souhaitez automatiser votre veille de marche pour vous concentrer sur votre strategie de décision."
    }
  ];

  return (
    <section id="for-who" className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Market</span>{' '}
            <span className="text-green-500">Sentinel</span>{' '}
            est pour <span className="gradient-text">qui ?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Market Sentinel s'adresse a tous ceux qui investissent sur les marchés
            et veulent prendre des decisions plus eclairees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl ${
                index % 2 === 0 ? 'neon-border-green' : 'neon-border-cyan'
              } bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all`}
            >
              <div
                className={`mb-6 p-3 rounded-lg ${
                  index % 2 === 0 ? 'bg-green-500/10' : 'bg-cyan-500/10'
                } w-fit`}
              >
                <profile.icon
                  className={`w-8 h-8 ${
                    index % 2 === 0 ? 'text-green-500' : 'text-cyan-500'
                  }`}
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">{profile.title}</h3>
              <p className="text-gray-400 leading-relaxed">{profile.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 rounded-xl neon-border-green bg-gray-900/30 backdrop-blur-sm">
          <p className="text-2xl text-green-400 font-semibold mb-2">
            Quel que soit votre profil...
          </p>
          <p className="text-gray-300 text-lg">
            Si vous voulez eviter d'agir dans de mauvaises conditions,
            Market Sentinel est fait pour vous.
          </p>
        </div>
      </div>
    </section>
  );
}
