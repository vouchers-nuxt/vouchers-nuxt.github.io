import CategoryApi from "./api";
import { useCategoriesStore } from "../categories";
import Swal from "sweetalert2";

export default {
  async paginate(page: number, perPage: number) {
    try {
      const categoryStore = useCategoriesStore();
      const data: object = await new CategoryApi().paginate(page, perPage);
      categoryStore.categoriesPaginate = data;
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

  async findCategoryRootByName(name: string, perPage: number) {
    try {
      const categoryStore = useCategoriesStore();
      const data: object[] = await new CategoryApi().findCategoryRootByName(
        name,
        perPage
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

  async findById(id: number) {
    return await new CategoryApi().find(id);
  },

  async create(category: object) {
    return await new CategoryApi().create(category);
  },

  async update(id: number, category: object) {
    return await new CategoryApi().update(id, category);
  },

  async destroy(id: number) {
    return await new CategoryApi().destroy(id);
  },
};
