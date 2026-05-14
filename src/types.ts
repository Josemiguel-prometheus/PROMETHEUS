/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MarketAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
  sector?: string;
  category: 'Macro' | 'Equity' | 'Fixed Income' | 'Commodities' | 'Crypto' | 'Custom';
}

export interface SystemState {
  lastRefresh: string;
  isPolling: boolean;
  status: 'online' | 'offline' | 'error';
  message: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  lastAnalysis: string;
  status: 'idle' | 'analyzing' | 'warning';
}

export interface AppConfig {
  pollingInterval: number;
  rotationAggressiveness: number;
  selectedSectors: string[];
}
