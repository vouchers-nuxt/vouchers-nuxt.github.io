import { defineStore } from "pinia";
import actions from "./actions";

export const useBudgetsStore = defineStore("budgets", {
  // other options...
  state: () => ({
    budgetsPaginate: {} as object,
    budgets: [] as object[],
  }),
  actions,
});
