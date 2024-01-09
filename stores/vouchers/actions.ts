import VoucherApi from "./api";
import Swal from "sweetalert2";
import { useVouchersStore, type Metrics } from "./index";

export default {
  async paginate(page: number, perPage: number) {
    try {
      const vouchersStore = useVouchersStore();
      const data: Object = await new VoucherApi().paginate(page, perPage);
      vouchersStore.vouchersPaginate = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData?.data?.message ||
        "Não foi possivel recuperar informações de Vales!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },

  async paginateVoucherUser(page: number = 1, perPage: number = 10) {
    const vouchersStore = useVouchersStore();
    const data: object = await new VoucherApi().paginateVoucherUser(
      page,
      perPage
    );

    vouchersStore.vouchersPaginate = data;
  },

  async getMetricsUser() {
    const vouchersStore = useVouchersStore();
    const data: Metrics = await new VoucherApi().getMetricsUser();
    vouchersStore.metrics = data;
  },

  async getMetrics() {
    const vouchersStore = useVouchersStore();
    const data: Metrics = await new VoucherApi().getMetrics();
    vouchersStore.metrics = data;
  },

  async create(entityData: Object) {
    return await new VoucherApi().create(entityData);
  },
  async update(id: number, entityData: Object) {
    return await new VoucherApi().update(id, entityData);
  },
  async find(id: number) {
    return await new VoucherApi().find(id);
  },
  async destroy(id: number) {
    return await new VoucherApi().destroy(id);
  },
};
