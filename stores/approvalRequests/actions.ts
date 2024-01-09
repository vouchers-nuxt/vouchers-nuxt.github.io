import Swal from "sweetalert2";
import ApprovalRequestApi from "./api";
import { useApprovalRequestsStore } from "./index";

export default {
  async approvalRequestByUserPaginate(page: number = 1, perPage: number = 10) {
    try {
      const approvalRequestStore = useApprovalRequestsStore();
      const data: object = await new ApprovalRequestApi().approvalRequestByUserPaginate(
        page,
        perPage
      );
      approvalRequestStore.approvalRequestsPaginate = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData.data?.message ||
        "Não foi possivel recuperar informações de Vales!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },

  async update(id: number, entityData: object) {
    return await new ApprovalRequestApi().update(id, entityData);
  },

  async approvalRequests(page: number, perPage: number) {
    try {
      const approvalRequestStore = useApprovalRequestsStore();
      const data: object = await new ApprovalRequestApi().approvalRequests(
        page,
        perPage
      );
      approvalRequestStore.approvalRequestsPaginate = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData.data?.message ||
        "Não foi possivel recuperar informações de Vales!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },
};
