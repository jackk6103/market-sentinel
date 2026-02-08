import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Bell, Plus, Trash2, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';

const CURRENCY_PAIRS = [
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'AUD/USD',
  'USD/CAD',
  'NZD/USD',
  'EUR/GBP',
  'EUR/JPY',
];

export function AlertsPage() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    currency_pair: 'EUR/USD',
    alert_type: 'recommendation',
  });

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    if (!user) return;

    setLoading(true);
    const { data } = await supabase
      .from('user_alerts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setAlerts(data);
    }
    setLoading(false);
  };

  const handleAddAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await supabase.from('user_alerts').insert({
      user_id: user.id,
      currency_pair: newAlert.currency_pair,
      alert_type: newAlert.alert_type,
      condition: {},
      is_active: true,
    });

    setNewAlert({ currency_pair: 'EUR/USD', alert_type: 'recommendation' });
    setShowAddForm(false);
    loadAlerts();
  };

  const handleToggleAlert = async (id: string, currentStatus: boolean) => {
    await supabase
      .from('user_alerts')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    loadAlerts();
  };

  const handleDeleteAlert = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette alerte ?')) return;

    await supabase.from('user_alerts').delete().eq('id', id);
    loadAlerts();
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Bell className="w-7 h-7 text-green-500" />
              Mes Alertes
            </h2>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-gray-950 font-semibold rounded-lg transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Nouvelle alerte
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddAlert} className="mb-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-white mb-4">Creer une nouvelle alerte</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Paire de devises
                  </label>
                  <select
                    value={newAlert.currency_pair}
                    onChange={(e) => setNewAlert({ ...newAlert, currency_pair: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                  >
                    {CURRENCY_PAIRS.map((pair) => (
                      <option key={pair} value={pair}>
                        {pair}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Type d'alerte
                  </label>
                  <select
                    value={newAlert.alert_type}
                    onChange={(e) => setNewAlert({ ...newAlert, alert_type: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                  >
                    <option value="recommendation">Changement de recommandation</option>
                    <option value="volatility">Volatilite elevee</option>
                    <option value="price">Alerte de prix</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-gray-950 font-semibold rounded-lg transition-colors"
                >
                  Creer l'alerte
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="text-center py-12 text-gray-400">Chargement...</div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Aucune alerte configuree</p>
              <p className="text-gray-500 text-sm">
                Creez votre premiere alerte pour etre notifie des changements de marche
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-6 rounded-lg border transition-colors ${
                    alert.is_active
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-gray-800/20 border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        alert.is_active ? 'bg-green-500/20' : 'bg-gray-700'
                      }`}>
                        <Bell className={`w-6 h-6 ${
                          alert.is_active ? 'text-green-500' : 'text-gray-500'
                        }`} />
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className={`text-xl font-bold ${
                            alert.is_active ? 'text-white' : 'text-gray-500'
                          }`}>
                            {alert.currency_pair}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            alert.is_active
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-gray-700 text-gray-500'
                          }`}>
                            {alert.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {alert.alert_type === 'recommendation'
                            ? 'Alerte sur changement de recommandation'
                            : alert.alert_type === 'volatility'
                            ? 'Alerte sur volatilite elevee'
                            : 'Alerte de prix'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Creee le {new Date(alert.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleAlert(alert.id, alert.is_active)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        {alert.is_active ? (
                          <ToggleRight className="w-8 h-8 text-green-500" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 rounded-xl border border-cyan-500/20 p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-white mb-2">Comment fonctionnent les alertes ?</h3>
              <p className="text-gray-300 text-sm mb-3">
                Les alertes vous permettent d'etre notifie automatiquement lorsque les conditions de
                marche changent pour vos paires de devises favorites.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Recevez une notification quand la recommandation change (Trade → Attendre → Eviter)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Soyez alerte en cas de volatilite elevee sur vos paires suivies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Desactivez temporairement une alerte sans la supprimer</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
