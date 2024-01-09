function onlyNumbers(input: any) {
  return Number(toStr(input).replace(/\D+/gim, "") || "0");
}

function toStr(value: any) {
  return value ? value.toString() : "";
}

function numbersToCurrency(numbers: any, precision = 2) {
  const exp = Math.pow(10, precision);
  const float = parseFloat(numbers) / exp;
  return float.toFixed(precision);
}

function addThousandSeparator(integer: any, separator = ".") {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`);
}

function joinIntegerAndDecimal(integer: any, decimal: any, separator = ",") {
  return decimal ? integer + separator + decimal : integer;
}

function mask(value: any) {
  const numbers = onlyNumbers(value);
  const currency = numbersToCurrency(numbers, 2);
  const parts = toStr(currency).split(".");
  let integer = parts[0];
  let decimal = parts[1];
  integer = addThousandSeparator(integer, ".");
  return joinIntegerAndDecimal(integer, decimal, ",");
}

function convertToNumber(value: string) {
  const numbers = onlyNumbers(value);
  return numbersToCurrency(numbers, 2);
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp?.vueApp.directive("mask", {
    updated(e) {
      console.log(mask(e.value));
      e.value = mask(e.value);
    },
  });

  return {
    provide: {
      onlyNumbers,
      mask,
      numbersToCurrency,
      convertToNumber,
    },
  };
});
