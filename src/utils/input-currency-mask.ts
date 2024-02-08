export function inputCurrencyMask(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{1,})(\d{2})$/, '$1,$2')
    .replace(/(?=(\d{3})+(\D))\B/g, '.')
}
