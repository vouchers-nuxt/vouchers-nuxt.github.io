import Swal from "sweetalert2";
import DepartmentApi from "./api";
import { useDepartmentsStore } from "./index";
import { useCategoriesStore } from "../categories/index";

export default {
  async paginate(page: number, perPage: number) {
    try {
      const departmentStore = useDepartmentsStore();
      const data: object = await new DepartmentApi().paginate(page, perPage);
      departmentStore.departmentsPaginate = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData.data?.message ||
        "Não foi possivel recuperar informações de departamentos!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },

  async findDepartmentUserByName(name: string, perPage: number) {
    try {
      const departmentStore = useDepartmentsStore();
      const data: object[] = await new DepartmentApi().findDepartmentUserByName(
        name,
        perPage
      );
      departmentStore.departments = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData.data?.message ||
        "Não foi possivel recuperar informações de departamentos!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },

  async findByName(name: string, perPage: number) {
    try {
      const departmentStore = useDepartmentsStore();
      const data: object[] = await new DepartmentApi().findByName(
        name,
        perPage
      );
      departmentStore.departments = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData.data?.message ||
        "Não foi possivel recuperar informações de departamentos!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },

  async create(department: object) {
    return await new DepartmentApi().create(department);
  },

  async find(id: number) {
    return await new DepartmentApi().find(id);
  },

  async update(id: number, department: object) {
    return await new DepartmentApi().update(id, department);
  },

  async destroy(id: number) {
    return await new DepartmentApi().destroy(id);
  },
};
