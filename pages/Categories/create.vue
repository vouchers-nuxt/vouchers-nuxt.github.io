<template>
  <CategoriesForm
    v-model:category="category"
    :categories="categories"
    @submit="submit"
    @onSearchCategories="searchCategories"
  />
</template>

<script setup>
import Swal from "sweetalert2";
import { useCategoriesStore } from "@/stores/categories";
import { storeToRefs } from "pinia";

const { $blockui } = useNuxtApp();
const categoryStore = useCategoriesStore();

let category = useState("category", () => ({}));
const { categories } = storeToRefs(categoryStore);

onMounted(async () => {
  category.value = {};
  await searchCategories("");
});

async function searchCategories(e) {
  await categoryStore.findCategoryRootByName(e, 10);
}

function DTO(category) {
  return {
    name: category.name,
    description: category.description,
    parent_category_id: category.parentCategory?.id,
  };
}

async function submit(e) {
  e.preventDefault();
  const { value } = category;
  try {
    $blockui().start();
    await categoryStore.create(DTO(value));
    Swal.fire({
      title: "Oba!",
      text: "Categoria criada com sucesso!",
      icon: "success",
    });
    navigateTo("/categories");
  } catch (err) {
    let message = err.data?.message || "Não foi possivel criar categoria!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  } finally {
    $blockui().stop();
  }
}
</script>
