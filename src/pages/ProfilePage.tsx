import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Mail, Calendar, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setProfile(data);
      setFullName(data.full_name || '');
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from('user_profiles')
      .update({ full_name: fullName })
      .eq('id', user.id);

    if (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la mise a jour du profil' });
    } else {
      setMessage({ type: 'success', text: 'Profil mis a jour avec succes' });
      loadProfile();
    }

    setSaving(false);
  };

  const getTrialDaysRemaining = () => {
    if (!profile?.trial_ends_at) return 0;
    const trialEnd = new Date(profile.trial_ends_at);
    const now = new Date();
    const diff = trialEnd.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-4xl mx-auto">
          <div className="text-center py-12 text-gray-400">Chargement...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
            <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Mode Demo</h2>
            <p className="text-gray-400 mb-6">
              Creez un compte pour acceder a votre profil et sauvegarder vos preferences.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-gray-950 font-semibold rounded-lg transition-all hover:scale-105"
            >
              Creer un compte gratuitement
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const trialDays = getTrialDaysRemaining();
  const isTrialActive = profile?.subscription_status === 'trial' && trialDays > 0;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <User className="w-7 h-7 text-green-500" />
            Mon Profil
          </h2>

          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <p className={`text-sm ${
                message.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {message.text}
              </p>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">L'email ne peut pas etre modifie</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Membre depuis
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : ''}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-950 disabled:text-gray-500 font-semibold rounded-lg transition-all hover:scale-105 disabled:hover:scale-100"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </form>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-green-500" />
            Abonnement
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Statut</span>
              <span className={`font-semibold px-3 py-1 rounded-full ${
                isTrialActive
                  ? 'bg-green-500/20 text-green-500'
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {isTrialActive ? 'Essai gratuit actif' : profile?.subscription_status === 'active' ? 'Actif' : 'Inactif'}
              </span>
            </div>

            {isTrialActive && (
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-400">Jours restants</span>
                <span className="font-bold text-white">{trialDays} jours</span>
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Plan actuel</span>
              <span className="font-semibold text-white">
                {profile?.subscription_status === 'active' ? 'Pro - 29€/mois' : 'Essai gratuit'}
              </span>
            </div>

            {isTrialActive && (
              <div className="p-6 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Profitez de votre essai gratuit</h4>
                    <p className="text-gray-300 text-sm mb-4">
                      Vous avez acces a toutes les fonctionnalites de Market Sentinel pendant {trialDays} jours.
                      Aucune carte bancaire requise.
                    </p>
                    <a
                      href="/#pricing"
                      className="inline-flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-gray-950 font-semibold rounded-lg transition-all hover:scale-105"
                    >
                      Passer au plan Pro
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
