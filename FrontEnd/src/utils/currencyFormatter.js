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
import { dinero, convert,toSnapshot } from 'dinero.js';
import { USD, XAF } from '@dinero.js/currencies';

const rates = { XAF: { amount: 59598, scale: 2 }}

function createConverter(rates) {
  return function converter(dineroObject, newCurrency) {
    if(newCurrency.code===toSnapshot(dineroObject).currency.code){
      return dineroObject;
    }
    return convert(dineroObject, newCurrency, rates);
  };
}
export const converter = createConverter(rates);
export const intlFormat = createIntlFormatter('fr');