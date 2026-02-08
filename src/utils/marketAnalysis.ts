interface MarketConditions {
  volatility: number;
  trend: 'bullish' | 'bearish' | 'sideways';
  volume: number;
  sentiment: number;
  technicalScore: number;
}

interface AnalysisResult {
  recommendation: 'trade' | 'wait' | 'avoid';
  confidence: number;
  reasoning: string;
  conditions: MarketConditions;
  factors: {
    name: string;
    value: number;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
}

export function analyzeMarket(pair: string, _timeframe: string): AnalysisResult {
  const volatility = Math.random() * 100;
  const volume = Math.random() * 100;
  const sentiment = (Math.random() - 0.5) * 200;
  const technicalScore = Math.random() * 100;

  const trendRand = Math.random();
  const trend = trendRand > 0.6 ? 'bullish' : trendRand > 0.3 ? 'bearish' : 'sideways';

  const conditions: MarketConditions = {
    volatility,
    trend,
    volume,
    sentiment,
    technicalScore,
  };

  const factors = [
    {
      name: 'Volatilite',
      value: volatility,
      impact: (volatility > 70 ? 'negative' : volatility > 40 ? 'neutral' : 'positive') as 'positive' | 'negative' | 'neutral',
      description:
        volatility > 70
          ? 'Volatilite tres elevee - Risque eleve'
          : volatility > 40
          ? 'Volatilite moderee - Conditions normales'
          : 'Faible volatilite - Marche stable',
    },
    {
      name: 'Tendance',
      value: trend === 'bullish' ? 80 : trend === 'bearish' ? 20 : 50,
      impact: (trend === 'sideways' ? 'negative' : 'positive') as 'positive' | 'negative' | 'neutral',
      description:
        trend === 'bullish'
          ? 'Tendance haussiere confirmee'
          : trend === 'bearish'
          ? 'Tendance baissiere confirmee'
          : 'Marche sans direction claire',
    },
    {
      name: 'Volume',
      value: volume,
      impact: (volume > 60 ? 'positive' : volume > 30 ? 'neutral' : 'negative') as 'positive' | 'negative' | 'neutral',
      description:
        volume > 60
          ? 'Volume eleve - Forte liquidite'
          : volume > 30
          ? 'Volume moyen - Liquidite suffisante'
          : 'Faible volume - Liquidite reduite',
    },
    {
      name: 'Sentiment',
      value: 50 + sentiment / 2,
      impact: (sentiment > 20 ? 'positive' : sentiment < -20 ? 'negative' : 'neutral') as 'positive' | 'negative' | 'neutral',
      description:
        sentiment > 20
          ? 'Sentiment de marche positif'
          : sentiment < -20
          ? 'Sentiment de marche negatif'
          : 'Sentiment neutre',
    },
    {
      name: 'Analyse technique',
      value: technicalScore,
      impact: (technicalScore > 60 ? 'positive' : technicalScore > 40 ? 'neutral' : 'negative') as 'positive' | 'negative' | 'neutral',
      description:
        technicalScore > 60
          ? 'Indicateurs techniques favorables'
          : technicalScore > 40
          ? 'Signaux mixtes'
          : 'Indicateurs defavorables',
    },
  ];

  let score = 0;
  factors.forEach((factor) => {
    if (factor.impact === 'positive') score += 20;
    if (factor.impact === 'negative') score -= 20;
  });

  let recommendation: 'trade' | 'wait' | 'avoid';
  let reasoning: string;
  let confidence: number;

  if (score >= 40 && volatility < 70 && volume > 40) {
    recommendation = 'trade';
    confidence = Math.min(95, 60 + score / 2);
    reasoning = `Conditions de marche favorables pour ${pair}. La tendance ${
      trend === 'bullish' ? 'haussiere' : 'baissiere'
    } est claire avec une volatilite acceptable (${volatility.toFixed(1)}%). Le volume de ${volume.toFixed(
      1
    )}% indique une bonne liquidite. Les indicateurs techniques sont alignes avec un score de ${technicalScore.toFixed(
      1
    )}/100. Le sentiment du marche est ${sentiment > 0 ? 'positif' : 'negatif'}. C'est le moment d'envisager une position.`;
  } else if (score < -20 || volatility > 80) {
    recommendation = 'avoid';
    confidence = Math.min(95, 60 + Math.abs(score) / 2);
    reasoning = `Le marche presente des conditions defavorables pour ${pair}. ${
      volatility > 80
        ? `La volatilite extreme (${volatility.toFixed(1)}%) augmente considerablement les risques.`
        : ''
    } ${
      volume < 30 ? `Le faible volume (${volume.toFixed(1)}%) reduit la liquidite disponible.` : ''
    } ${
      trend === 'sideways'
        ? 'Le marche manque de direction claire, rendant les predictions difficiles.'
        : ''
    } Il est preferable d'attendre de meilleures conditions avant d'ouvrir une position.`;
  } else {
    recommendation = 'wait';
    confidence = 50 + Math.random() * 20;
    reasoning = `L'actif ${pair} presente des signaux mixtes. La volatilite de ${volatility.toFixed(
      1
    )}% et un volume de ${volume.toFixed(
      1
    )}% suggerent de la prudence. Bien que certains indicateurs soient favorables, d'autres sont incertains. Il est recommande d'attendre une confirmation plus claire de la tendance avant d'entrer en position. Surveillez l'evolution dans les prochaines heures.`;
  }

  return {
    recommendation,
    confidence: Math.round(confidence),
    reasoning,
    conditions,
    factors: factors.map((f) => ({
      name: f.name,
      value: Math.round(f.value),
      impact: f.impact,
      description: f.description,
    })),
  };
}
