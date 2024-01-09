import { defineStore } from "pinia";
import actions from "../departments/actions";
export const useDepartmentsStore = defineStore("departments", {
  // other options...
  state: () => ({
    departmentsPaginate: {} as object,
    departments: [] as object[],
  }),
  actions,
});
