import { defineStore } from "pinia";
import actions from "./actions";

export interface Metrics {
  count_year: number;
  sum_year: number;
  sum_month: number;
  count_month: number;
}

export const useVouchersStore = defineStore("vouchers", {
  // other options...
  state: () => ({
    vouchers: [] as object[],
    vouchersPaginate: {} as object,
    metrics: {
      count_year: 0,
      sum_year: 0,
      sum_month: 0,
      count_month: 0,
    } as Metrics,
  }),
  actions,
});
