const API_URL = 'https://api.coingecko.com/api/v3';

const headers = {
  'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
};

export const fetchCoins = async (currency) => {

  const response = await fetch(
    `${API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch coins');
  }

  return response.json();
};

export const fetchCoinDetails = async (coinId) => {

  const response = await fetch(
    `${API_URL}/coins/${coinId}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch coin details');
  }

  return response.json();
};

export const fetchMarketChart = async (coinId, currency) => {

  const response = await fetch(
    `${API_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=7`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch market chart');
  }

  return response.json();
};