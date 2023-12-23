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

export const intlFormat = createIntlFormatter('en-US');