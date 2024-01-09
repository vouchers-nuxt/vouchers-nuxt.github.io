import Swal from "sweetalert2";
import { useRolesStore } from "./index";
import RoleApi from "./api";

export default {
  async findRoles(name: string, perPage: number): Promise<void> {
    try {
      const roleStore = useRolesStore();
      const data: object[] = await new RoleApi().findByName(name, perPage);
      roleStore.roles = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData?.data?.message ||
        "Não foi possivel recuperar informações de cargos!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },
  async paginate(page: number, perPage: number) {
    try {
      const roleStore = useRolesStore();

      const data: object = await new RoleApi().rolesPaginate(page, perPage);
      roleStore.rolesPaginate = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData?.data?.message ||
        "Não foi possivel recuperar informações de cargos!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },

  async findRole(id: number): Promise<object | void> {
    try {
      return await new RoleApi().find(id);
    } catch (err) {
      const errData: any = err;
      const message =
        errData.data?.message ||
        "Não foi possivel recuperar informações de cargo!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },

  async create(role: object): Promise<object> {
    return await new RoleApi().create(role);
  },

  async update(id: number, role: object): Promise<object> {
    return await new RoleApi().update(id, role);
  },

  async destroy(id: number): Promise<void> {
    await new RoleApi().destroy(id);
  },
};
