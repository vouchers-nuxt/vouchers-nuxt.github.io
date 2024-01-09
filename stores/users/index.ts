import { defineStore } from "pinia";
import actions from "../users/actions";
export const useUsersStore = defineStore("users", {
  // other options...
  state: () => ({
    profile: {} as any,
    users: [] as object[],
    usersPaginate: [] as object,
    token: "",
    error: "",
  }),
  actions,
});
