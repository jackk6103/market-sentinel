import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CheckCircle, Clock, XCircle, Calendar, TrendingUp, Trash2 } from 'lucide-react';

export function HistoryPage() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'trade' | 'wait' | 'avoid'>('all');

  useEffect(() => {
    loadAnalyses();
  }, [filter]);

  const loadAnalyses = async () => {
    if (!user) return;

    setLoading(true);

    let query = supabase
      .from('market_analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('recommendation', filter);
    }

    const { data } = await query;

    if (data) {
      setAnalyses(data);
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette analyse ?')) return;

    await supabase.from('market_analyses').delete().eq('id', id);
    loadAnalyses();
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'trade':
        return <CheckCircle className="w-5 h-5" />;
      case 'wait':
        return <Clock className="w-5 h-5" />;
      case 'avoid':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'trade':
        return 'text-green-500 bg-green-500/10';
      case 'wait':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'avoid':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case 'trade':
        return 'TRADER';
      case 'wait':
        return 'ATTENDRE';
      case 'avoid':
        return 'EVITER';
      default:
        return 'INCONNU';
    }
  };

  const stats = {
    total: analyses.length,
    trade: analyses.filter((a) => a.recommendation === 'trade').length,
    wait: analyses.filter((a) => a.recommendation === 'wait').length,
    avoid: analyses.filter((a) => a.recommendation === 'avoid').length,
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <div className="text-gray-400 text-sm mb-1">Total</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-gray-900 rounded-xl border border-green-500/30 p-4">
            <div className="text-gray-400 text-sm mb-1">A trader</div>
            <div className="text-2xl font-bold text-green-500">{stats.trade}</div>
          </div>
          <div className="bg-gray-900 rounded-xl border border-yellow-500/30 p-4">
            <div className="text-gray-400 text-sm mb-1">Attendre</div>
            <div className="text-2xl font-bold text-yellow-500">{stats.wait}</div>
          </div>
          <div className="bg-gray-900 rounded-xl border border-red-500/30 p-4">
            <div className="text-gray-400 text-sm mb-1">A eviter</div>
            <div className="text-2xl font-bold text-red-500">{stats.avoid}</div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-7 h-7 text-green-500" />
              Historique des analyses
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-green-500 text-gray-950'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setFilter('trade')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'trade'
                    ? 'bg-green-500 text-gray-950'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Trader
              </button>
              <button
                onClick={() => setFilter('wait')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'wait'
                    ? 'bg-yellow-500 text-gray-950'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Attendre
              </button>
              <button
                onClick={() => setFilter('avoid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'avoid'
                    ? 'bg-red-500 text-gray-950'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Eviter
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Chargement...</div>
          ) : analyses.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400">Aucune analyse trouvee</p>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{analysis.currency_pair}</h3>
                        <span className="text-sm px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
                          {analysis.timeframe}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(analysis.created_at).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${getRecommendationColor(analysis.recommendation)}`}>
                        {getRecommendationIcon(analysis.recommendation)}
                        <span className="font-bold">{getRecommendationText(analysis.recommendation)}</span>
                      </div>
                      <button
                        onClick={() => handleDelete(analysis.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="text-gray-400">Confiance</span>
                      <span className="text-white font-bold">{analysis.confidence_score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          analysis.recommendation === 'trade'
                            ? 'bg-green-500'
                            : analysis.recommendation === 'wait'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${analysis.confidence_score}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{analysis.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
