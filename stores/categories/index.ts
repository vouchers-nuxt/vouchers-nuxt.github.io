import { defineStore } from "pinia";
import actions from "../categories/actions";
export const useCategoriesStore = defineStore("categories", {
  // other options...
  state: () => ({
    categoriesPaginate: {} as Object,
    categories: [] as object[],
  }),
  getters: {
    getCategory: (state: any) => {
      return (id: number) => {
        return state.categoriesPaginate.data?.find(
          (category: any) => category.id == id
        );
      };
    },
  },
  actions,
});
