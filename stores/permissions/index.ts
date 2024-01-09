import { defineStore } from "pinia";
import actions from "../permissions/actions";
export const usePermissionsStore = defineStore("permissions", {
  // other options...
  state: () => ({
    permissions: [] as Object[],
    permissionsPagiante: {} as Object,
  }),
  actions,
});
