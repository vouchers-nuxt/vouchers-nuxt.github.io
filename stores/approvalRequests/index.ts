import { defineStore } from "pinia";
import actions from "./actions";

export const useApprovalRequestsStore = defineStore("approvalRequests", {
  // other options...
  state: () => ({
    approvalRequestsPaginate: {} as any,
    approvalRequests: [] as object[],
  }),
  actions,
});
