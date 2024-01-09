import { defineStore } from "pinia";
import actions from "./actions";
export const useRolesStore = defineStore("roles", {
  // other options...
  state: () => ({ roles: [] as object[], rolesPaginate: {} as object }),
  actions,
});
