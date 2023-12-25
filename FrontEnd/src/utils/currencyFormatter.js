import { toDecimal } from 'dinero.js';

function createIntlFormatter(locale, options = {}) {
  function transformer({ value, currency }) {
    return Number(value).toLocaleString(locale, {
      ...options,
      style: 'currency',
      currency: currency.code,
    });
  };

  return function formatter(dineroObject) {
    return toDecimal(dineroObject, transformer);
  };
}
import { dinero, convert } from 'dinero.js';
import { USD, XAF } from '@dinero.js/currencies';

const rates = { XAF: { amount: 595.98, scale: 1 } }

function createConverter(rates) {
  return function converter(dineroObject, newCurrency) {
    return convert(dineroObject, newCurrency, rates);
  };
}
export const converter = createConverter(rates);
export const intlFormat = createIntlFormatter('fr');