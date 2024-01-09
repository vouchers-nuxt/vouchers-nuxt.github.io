import Swal from "sweetalert2";

import PermissionApi from "./api";
import { usePermissionsStore } from "./index";
export default {
  async find(name: string, perPage: number) {
    try {
      const permissionStore = usePermissionsStore();
      const data = await new PermissionApi().findByName(name, perPage);

      permissionStore.permissions = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData.data?.message ||
        "Não foi possivel recuperar informações de permissões!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },

  async paginate(page: number, perPage: number) {
    try {
      const permissionStore = usePermissionsStore();

      const data: Object = await new PermissionApi().paginate(page, perPage);
      permissionStore.permissionsPagiante = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData.data?.message ||
        "Não foi possivel recuperar informações de permissões!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },
};
