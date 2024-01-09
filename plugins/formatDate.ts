import { DateTime } from "luxon";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      dateTime: (date: string, toFormat: string) =>
        DateTime.fromISO(date).toFormat(toFormat, { locale: "pt" }),
      instanceLuxon: DateTime,
    },
  };
});
