export interface Asset {
  symbol: string;
  name: string;
}

export interface AssetCategory {
  id: string;
  name: string;
  icon: string;
  assets: Asset[];
}

export const TRADING_CATEGORIES: AssetCategory[] = [
  {
    id: 'forex',
    name: 'Forex',
    icon: '💱',
    assets: [
      { symbol: 'EUR/USD', name: 'Euro / Dollar US' },
      { symbol: 'GBP/USD', name: 'Livre Sterling / Dollar US' },
      { symbol: 'USD/JPY', name: 'Dollar US / Yen' },
      { symbol: 'AUD/USD', name: 'Dollar Australien / Dollar US' },
      { symbol: 'USD/CAD', name: 'Dollar US / Dollar Canadien' },
      { symbol: 'NZD/USD', name: 'Dollar Neo-Zelandais / Dollar US' },
      { symbol: 'EUR/GBP', name: 'Euro / Livre Sterling' },
      { symbol: 'EUR/JPY', name: 'Euro / Yen' },
      { symbol: 'GBP/JPY', name: 'Livre Sterling / Yen' },
      { symbol: 'USD/CHF', name: 'Dollar US / Franc Suisse' },
    ],
  },
  {
    id: 'crypto',
    name: 'Crypto',
    icon: '₿',
    assets: [
      { symbol: 'BTC/USD', name: 'Bitcoin' },
      { symbol: 'ETH/USD', name: 'Ethereum' },
      { symbol: 'BNB/USD', name: 'Binance Coin' },
      { symbol: 'XRP/USD', name: 'Ripple' },
      { symbol: 'ADA/USD', name: 'Cardano' },
      { symbol: 'SOL/USD', name: 'Solana' },
      { symbol: 'DOT/USD', name: 'Polkadot' },
      { symbol: 'MATIC/USD', name: 'Polygon' },
      { symbol: 'AVAX/USD', name: 'Avalanche' },
      { symbol: 'LINK/USD', name: 'Chainlink' },
    ],
  },
  {
    id: 'commodities',
    name: 'Matieres Premieres',
    icon: '🛢️',
    assets: [
      { symbol: 'XAU/USD', name: 'Or' },
      { symbol: 'XAG/USD', name: 'Argent' },
      { symbol: 'WTI', name: 'Petrole WTI' },
      { symbol: 'BRENT', name: 'Petrole Brent' },
      { symbol: 'NG', name: 'Gaz Naturel' },
      { symbol: 'COPPER', name: 'Cuivre' },
      { symbol: 'WHEAT', name: 'Ble' },
      { symbol: 'CORN', name: 'Mais' },
      { symbol: 'SUGAR', name: 'Sucre' },
      { symbol: 'COFFEE', name: 'Cafe' },
    ],
  },
  {
    id: 'etf',
    name: 'ETF',
    icon: '📊',
    assets: [
      { symbol: 'SPY', name: 'SPDR S&P 500 ETF' },
      { symbol: 'QQQ', name: 'Invesco QQQ Trust' },
      { symbol: 'IWM', name: 'iShares Russell 2000 ETF' },
      { symbol: 'EEM', name: 'iShares MSCI Emerging Markets ETF' },
      { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF' },
      { symbol: 'GLD', name: 'SPDR Gold Trust' },
      { symbol: 'SLV', name: 'iShares Silver Trust' },
      { symbol: 'USO', name: 'United States Oil Fund' },
      { symbol: 'TLT', name: 'iShares 20+ Year Treasury Bond ETF' },
      { symbol: 'EFA', name: 'iShares MSCI EAFE ETF' },
    ],
  },
];

export const TIMEFRAMES = ['5m', '15m', '30m', '1h', '4h', '1d', '1w'];
