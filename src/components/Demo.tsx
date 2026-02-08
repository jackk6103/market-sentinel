import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Loader2, BarChart3, Activity, Clock, Zap } from 'lucide-react';

interface MarketData {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: number;
  marketCap: number;
}

interface Analysis {
  verdict: 'TRADE' | 'NO_TRADE' | 'CAUTION';
  confidence: number;
  reasons: string[];
  signals: {
    trend: 'bullish' | 'bearish' | 'neutral';
    volatility: 'low' | 'medium' | 'high';
    momentum: 'strong' | 'weak' | 'neutral';
    volume: 'high' | 'normal' | 'low';
  };
}

const ASSETS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
];

function analyzeMarket(data: MarketData): Analysis {
  const signals = {
    trend: data.change24h > 2 ? 'bullish' as const : data.change24h < -2 ? 'bearish' as const : 'neutral' as const,
    volatility: Math.abs(data.high24h - data.low24h) / data.price > 0.08 ? 'high' as const : Math.abs(data.high24h - data.low24h) / data.price > 0.04 ? 'medium' as const : 'low' as const,
    momentum: Math.abs(data.change24h) > 5 ? 'strong' as const : Math.abs(data.change24h) > 2 ? 'neutral' as const : 'weak' as const,
    volume: data.volume > data.marketCap * 0.05 ? 'high' as const : data.volume > data.marketCap * 0.02 ? 'normal' as const : 'low' as const,
  };

  const reasons: string[] = [];
  let score = 50;

  if (signals.volatility === 'high') {
    score -= 25;
    reasons.push('Volatilite elevee - risque accru de pertes');
  } else if (signals.volatility === 'low') {
    score += 10;
    reasons.push('Volatilite faible - marche stable');
  }

  if (signals.trend === 'bearish' && signals.momentum === 'strong') {
    score -= 20;
    reasons.push('Tendance baissiere forte - evitez les positions longues');
  } else if (signals.trend === 'bullish' && signals.momentum === 'strong') {
    score += 15;
    reasons.push('Tendance haussiere confirmee');
  } else if (signals.trend === 'neutral') {
    score -= 10;
    reasons.push('Pas de tendance claire - attendre un signal');
  }

  if (signals.volume === 'low') {
    score -= 15;
    reasons.push('Volume faible - liquidite insuffisante');
  } else if (signals.volume === 'high') {
    score += 10;
    reasons.push('Volume eleve - bonne liquidite');
  }

  if (Math.abs(data.change24h) > 10) {
    score -= 20;
    reasons.push('Mouvement extreme recent - risque de correction');
  }

  const pricePosition = (data.price - data.low24h) / (data.high24h - data.low24h);
  if (pricePosition > 0.9) {
    score -= 15;
    reasons.push('Prix proche du plus haut 24h - potentiel de hausse limite');
  } else if (pricePosition < 0.1) {
    score -= 10;
    reasons.push('Prix proche du plus bas 24h - attention au support');
  }

  let verdict: 'TRADE' | 'NO_TRADE' | 'CAUTION';
  if (score >= 60) {
    verdict = 'TRADE';
  } else if (score >= 40) {
    verdict = 'CAUTION';
  } else {
    verdict = 'NO_TRADE';
  }

  return {
    verdict,
    confidence: Math.min(Math.max(score, 10), 95),
    reasons: reasons.slice(0, 4),
    signals,
  };
}

export function Demo() {
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAndAnalyze = async () => {
    setLoading(true);
    setError(null);
    setMarketData(null);
    setAnalysis(null);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${selectedAsset.id}?localization=false&tickers=false&community_data=false&developer_data=false`
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la recuperation des donnees');
      }

      const data = await response.json();

      const fetchedData: MarketData = {
        price: data.market_data.current_price.usd,
        change24h: data.market_data.price_change_percentage_24h,
        high24h: data.market_data.high_24h.usd,
        low24h: data.market_data.low_24h.usd,
        volume: data.market_data.total_volume.usd,
        marketCap: data.market_data.market_cap.usd,
      };

      setMarketData(fetchedData);

      await new Promise(resolve => setTimeout(resolve, 800));

      const result = analyzeMarket(fetchedData);
      setAnalysis(result);
    } catch (err) {
      setError('Impossible de recuperer les donnees. Reessayez dans quelques secondes.');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Essai gratuit - Aucune inscription requise
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Testez <span className="text-white">Market</span>{' '}
            <span className="text-green-500">Sentinel</span>{' '}
            <span className="gradient-text">maintenant</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Selectionnez un actif et obtenez une analyse en temps reel.
            Voyez par vous-meme comment Market Sentinel vous aide a decider.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <label className="block text-sm text-gray-400 mb-2">Selectionnez un actif</label>
                  <div className="flex flex-wrap gap-2">
                    {ASSETS.map((asset) => (
                      <button
                        key={asset.id}
                        onClick={() => setSelectedAsset(asset)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedAsset.id === asset.id
                            ? 'bg-green-500 text-gray-950'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {asset.symbol}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={fetchAndAnalyze}
                  disabled={loading}
                  className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-gray-950 font-semibold rounded-lg transition-all hover:scale-105 disabled:hover:scale-100 flex items-center gap-2 whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      Analyser {selectedAsset.symbol}
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-6 bg-red-500/10 border-b border-red-500/30">
                <p className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {error}
                </p>
              </div>
            )}

            {marketData && (
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Donnees de marche - {selectedAsset.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Prix actuel</p>
                    <p className="text-xl font-bold text-white">${marketData.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Variation 24h</p>
                    <p className={`text-xl font-bold flex items-center gap-1 ${marketData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {marketData.change24h >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      {marketData.change24h.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Volume 24h</p>
                    <p className="text-xl font-bold text-white">{formatNumber(marketData.volume)}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Cap. Marche</p>
                    <p className="text-xl font-bold text-white">{formatNumber(marketData.marketCap)}</p>
                  </div>
                </div>
              </div>
            )}

            {analysis && (
              <div className="p-6">
                <div className={`rounded-xl p-6 mb-6 ${
                  analysis.verdict === 'TRADE' ? 'bg-green-500/10 border border-green-500/30' :
                  analysis.verdict === 'NO_TRADE' ? 'bg-red-500/10 border border-red-500/30' :
                  'bg-yellow-500/10 border border-yellow-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {analysis.verdict === 'TRADE' ? (
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      ) : analysis.verdict === 'NO_TRADE' ? (
                        <XCircle className="w-10 h-10 text-red-500" />
                      ) : (
                        <AlertTriangle className="w-10 h-10 text-yellow-500" />
                      )}
                      <div>
                        <h3 className={`text-2xl font-bold ${
                          analysis.verdict === 'TRADE' ? 'text-green-400' :
                          analysis.verdict === 'NO_TRADE' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          {analysis.verdict === 'TRADE' ? 'CONDITIONS FAVORABLES' :
                           analysis.verdict === 'NO_TRADE' ? 'NE PAS TRADER' :
                           'PRUDENCE REQUISE'}
                        </h3>
                        <p className="text-gray-400">
                          Confiance de l'analyse : {analysis.confidence}%
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      Analyse en temps reel
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">Tendance</p>
                      <p className={`font-semibold ${
                        analysis.signals.trend === 'bullish' ? 'text-green-400' :
                        analysis.signals.trend === 'bearish' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {analysis.signals.trend === 'bullish' ? 'Haussiere' :
                         analysis.signals.trend === 'bearish' ? 'Baissiere' : 'Neutre'}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">Volatilite</p>
                      <p className={`font-semibold ${
                        analysis.signals.volatility === 'low' ? 'text-green-400' :
                        analysis.signals.volatility === 'high' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {analysis.signals.volatility === 'low' ? 'Faible' :
                         analysis.signals.volatility === 'high' ? 'Elevee' : 'Moyenne'}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">Momentum</p>
                      <p className={`font-semibold ${
                        analysis.signals.momentum === 'strong' ? 'text-cyan-400' :
                        analysis.signals.momentum === 'weak' ? 'text-gray-400' :
                        'text-gray-300'
                      }`}>
                        {analysis.signals.momentum === 'strong' ? 'Fort' :
                         analysis.signals.momentum === 'weak' ? 'Faible' : 'Neutre'}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">Volume</p>
                      <p className={`font-semibold ${
                        analysis.signals.volume === 'high' ? 'text-green-400' :
                        analysis.signals.volume === 'low' ? 'text-red-400' :
                        'text-gray-300'
                      }`}>
                        {analysis.signals.volume === 'high' ? 'Eleve' :
                         analysis.signals.volume === 'low' ? 'Faible' : 'Normal'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Raisons de cette recommandation :</h4>
                    <ul className="space-y-2">
                      {analysis.reasons.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-500">
                  Cette analyse est fournie a titre indicatif. Le trading comporte des risques.
                </p>
              </div>
            )}

            {!marketData && !loading && !error && (
              <div className="p-12 text-center">
                <BarChart3 className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Cliquez sur "Analyser" pour obtenir une analyse en temps reel
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
