import { Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Pricing() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate('/signup');
  };

  return (
    <>
      <section id="pricing" className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Un seul prix.
              <br />
              <span className="gradient-text">Simple et transparent.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Accedez a toutes les fonctionnalites de Market Sentinel pour un tarif fixe.
              Sans engagement, sans surprises.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

              <div className="relative bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 bg-green-500/10 rounded-full mb-6">
                    <span className="text-green-500 font-semibold">Plan Pro</span>
                  </div>

                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-6xl font-bold text-white">29€</span>
                    <span className="text-2xl text-gray-400">/mois</span>
                  </div>

                  <p className="text-gray-400">
                    Facturation mensuelle, resiliable a tout moment
                  </p>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Analyses illimitees</span> de toutes les paires de devises
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Agent IA avance</span> avec analyse multi-facteurs
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Alertes en temps reel</span> sur les conditions de marche
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Historique complet</span> de vos analyses et decisions
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Rapports detailles</span> avec explications IA
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Support prioritaire</span> par email
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">Mises a jour regulieres</span> de l'algorithme
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubscribe}
                  className="group w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-gray-950 font-semibold rounded-lg transition-all glow-green hover:scale-105 flex items-center justify-center gap-2"
                >
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Paiement securise. Annulez a tout moment.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-white mb-2">Essai gratuit 7 jours</h3>
              <p className="text-gray-400 text-sm">
                Testez toutes les fonctionnalites sans engagement
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="font-semibold text-white mb-2">Sans engagement</h3>
              <p className="text-gray-400 text-sm">
                Resiliez votre abonnement quand vous voulez
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-white mb-2">Paiement securise</h3>
              <p className="text-gray-400 text-sm">
                Vos donnees bancaires sont protegees
              </p>
            </div>
          </div>
        </div>
      </section>

      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
}

function CheckoutModal({ onClose }: { onClose: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    setTimeout(() => {
      alert('Cette application gère les paiements. Dans la version finale, vous serez redirigé vers un système de paiement sécurisé (Stripe Checkout).');
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gray-900 rounded-2xl max-w-md w-full p-8 border border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Confirmer votre abonnement</h3>
          <p className="text-gray-400">Market Sentinel - Plan Pro</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-gray-400">Abonnement mensuel</span>
            <span className="text-2xl font-bold text-white">29€</span>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>Facturation</span>
              <span>Mensuelle</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Prochain prelevement</span>
              <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-950 disabled:text-gray-500 font-semibold rounded-lg transition-all glow-green hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement...
            </>
          ) : (
            <>
              Proceder au paiement
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Paiement securise par Stripe. Vos donnees sont protegees.
        </p>
      </div>
    </div>
  );
}
