import Swal from "sweetalert2";
import BudgetApi from "./api";
import { useBudgetsStore } from "./index";
import { useCategoriesStore } from "../categories/index";

export default {
  async paginate(page: number, perPage: number) {
    try {
      const budgetStore = useBudgetsStore();
      const data: object = await new BudgetApi().paginate(page, perPage);
      budgetStore.budgetsPaginate = data;
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

  async findCategoryByDepartment(paylod: object) {
    try {
      const categoryStore = useCategoriesStore();
      const data: Object[] = await new BudgetApi().findCategoryByDepartment(
        paylod
      );
      categoryStore.categories = data;
    } catch (err) {
      const errData: any = err;
      const message =
        errData.data?.message ||
        "Não foi possivel recuperar informações de categorias!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  },

  async find(id: number) {
    return await new BudgetApi().find(id);
  },

  async create(budget: object) {
    return await new BudgetApi().create(budget);
  },
  async update(id: number, budget: object) {
    return await new BudgetApi().update(id, budget);
  },
  async destroy(id: number) {
    return await new BudgetApi().destroy(id);
  },
};
