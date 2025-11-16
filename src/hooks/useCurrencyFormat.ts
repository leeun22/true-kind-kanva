export const useCurrencyFormat = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00'
  }

  // Use 'en-US' locale, style 'currency' and currency 'USD'
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, // Make sure there are always 2 decimal places
    maximumFractionDigits: 2
  })

  return formatter.format(amount)
}
