import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { analyzeMarket } from '../utils/marketAnalysis';
import { TRADING_CATEGORIES, TIMEFRAMES } from '../utils/tradingAssets';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  BarChart3,
  RefreshCw,
} from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('tradingCategory') || 'forex';
  });
  const [currentAssets, setCurrentAssets] = useState(() => {
    const category = TRADING_CATEGORIES.find(c => c.id === selectedCategory);
    return category?.assets || [];
  });
  const [selectedAsset, setSelectedAsset] = useState(() => {
    const category = TRADING_CATEGORIES.find(c => c.id === selectedCategory);
    return category?.assets[0]?.symbol || '';
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);

  useEffect(() => {
    loadRecentAnalyses();
  }, []);

  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      const newCategory = event.detail;
      setSelectedCategory(newCategory);
      const category = TRADING_CATEGORIES.find(c => c.id === newCategory);
      if (category) {
        setCurrentAssets(category.assets);
        setSelectedAsset(category.assets[0]?.symbol || '');
        setAnalysis(null);
      }
    };

    window.addEventListener('categoryChange', handleCategoryChange as EventListener);
    return () => {
      window.removeEventListener('categoryChange', handleCategoryChange as EventListener);
    };
  }, []);

  const loadRecentAnalyses = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('market_analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (data) {
      setRecentAnalyses(data);
    }
  };

  const handleAnalyze = async () => {
    if (!user) return;

    setLoading(true);

    setTimeout(async () => {
      const result = analyzeMarket(selectedAsset, selectedTimeframe);

      await supabase.from('market_analyses').insert({
        user_id: user.id,
        currency_pair: selectedAsset,
        timeframe: selectedTimeframe,
        recommendation: result.recommendation,
        confidence_score: result.confidence,
        analysis_data: { factors: result.factors },
        market_conditions: result.conditions,
        reasoning: result.reasoning,
      });

      setAnalysis(result);
      setLoading(false);
      loadRecentAnalyses();
    }, 1500);
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'trade':
        return <CheckCircle className="w-6 h-6" />;
      case 'wait':
        return <Clock className="w-6 h-6" />;
      case 'avoid':
        return <XCircle className="w-6 h-6" />;
      default:
        return <Activity className="w-6 h-6" />;
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
        return 'ANALYSE';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-green-500" />
            Nouvelle Analyse de Marche
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {selectedCategory === 'forex' && 'Paire de devises'}
                {selectedCategory === 'crypto' && 'Cryptomonnaie'}
                {selectedCategory === 'commodities' && 'Matiere premiere'}
                {selectedCategory === 'etf' && 'ETF'}
              </label>
              <select
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
              >
                {currentAssets.map((asset) => (
                  <option key={asset.symbol} value={asset.symbol}>
                    {asset.symbol} - {asset.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Intervalle de temps
              </label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
              >
                {TIMEFRAMES.map((tf) => (
                  <option key={tf} value={tf}>
                    {tf}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-950 disabled:text-gray-500 font-semibold rounded-lg transition-all hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Activity className="w-5 h-5" />
                Lancer l'analyse IA
              </>
            )}
          </button>
        </div>

        {analysis && (
          <div className={`bg-gray-900 rounded-xl border-2 ${
            analysis.recommendation === 'trade'
              ? 'border-green-500/50'
              : analysis.recommendation === 'wait'
              ? 'border-yellow-500/50'
              : 'border-red-500/50'
          } p-6 relative overflow-hidden`}>
            <div className={`absolute inset-0 ${
              analysis.recommendation === 'trade'
                ? 'bg-green-500/5'
                : analysis.recommendation === 'wait'
                ? 'bg-yellow-500/5'
                : 'bg-red-500/5'
            }`}></div>

            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Resultat de l'analyse: {selectedAsset}
                  </h3>
                  <p className="text-gray-400">Intervalle: {selectedTimeframe}</p>
                </div>
                <div className={`flex items-center gap-3 px-6 py-3 rounded-xl ${
                  analysis.recommendation === 'trade'
                    ? 'bg-green-500/20 text-green-500'
                    : analysis.recommendation === 'wait'
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {getRecommendationIcon(analysis.recommendation)}
                  <span className="font-bold text-xl">
                    {getRecommendationText(analysis.recommendation)}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Niveau de confiance</span>
                  <span className="text-white font-bold">{analysis.confidence}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      analysis.recommendation === 'trade'
                        ? 'bg-green-500'
                        : analysis.recommendation === 'wait'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${analysis.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-cyan-500" />
                  Explication de l'IA
                </h4>
                <p className="text-gray-300 leading-relaxed">{analysis.reasoning}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.factors.map((factor: any, index: number) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-400">{factor.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        factor.impact === 'positive'
                          ? 'bg-green-500/20 text-green-500'
                          : factor.impact === 'negative'
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {factor.impact === 'positive' ? '↑' : factor.impact === 'negative' ? '↓' : '→'}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{factor.value}%</div>
                    <p className="text-xs text-gray-500">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {recentAnalyses.length > 0 && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Analyses recentes</h3>
            <div className="space-y-3">
              {recentAnalyses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${
                      item.recommendation === 'trade'
                        ? 'text-green-500'
                        : item.recommendation === 'wait'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}>
                      {getRecommendationIcon(item.recommendation)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{item.currency_pair}</div>
                      <div className="text-sm text-gray-400">
                        {new Date(item.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      item.recommendation === 'trade'
                        ? 'text-green-500'
                        : item.recommendation === 'wait'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}>
                      {getRecommendationText(item.recommendation)}
                    </div>
                    <div className="text-sm text-gray-400">{item.confidence_score}% confiance</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
