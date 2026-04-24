export const useCryptoChart = (rawData: CryptoHistoryResponse | null) => {
  if (!rawData?.prices) return [];

  return rawData.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    price: parseFloat(price.toFixed(2)),
  }));
};
