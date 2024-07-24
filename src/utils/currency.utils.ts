export function formatMoney(
  amount: number,
  noSpaces = false,
  decimalPlaces = 2,
): string {
  if (typeof amount !== 'number') return '0.00';

  const fixedDecimalAmount = amount.toFixed(decimalPlaces);
  const parts = fixedDecimalAmount.toString().split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
  const decimalPart = parts[1] ? parts[1] : '00';

  if (noSpaces) {
    return `${integerPart}.${decimalPart}`.replaceAll(' ', '');
  }
  return `${integerPart}.${decimalPart}`;
}
