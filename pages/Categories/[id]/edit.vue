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
import { useCategoriesStore } from "../../../stores/categories";
import { storeToRefs } from "pinia";

const route = useRoute();
const { $blockui } = useNuxtApp();
const categoryStore = useCategoriesStore();

let category = useState("category", () => ({}));
const { categories, getCategory } = storeToRefs(categoryStore);
const { id } = route.params;

onMounted(async () => {
  $blockui().start();
  category.value = getCategory.value(id) ?? (await categoryStore.findById(id));
  await searchCategories("");

  categories.value = categories.value.filter((category) => category.id != id);
  $blockui().stop();
});

async function searchCategories(e) {
  await categoryStore.findCategoryRootByName(e, 10);
}

function DTO(category) {
  return {
    name: category.name,
    description: category.description,
    parent_category_id: category.parentCategory?.id || null,
  };
}

async function submit(e) {
  e.preventDefault();
  try {
    const { value } = category;
    $blockui().start();

    console.log(DTO(value));
    await categoryStore.update(id, DTO(value));
    Swal.fire({
      title: "Oba!",
      text: "Categoria criada com sucesso!",
      icon: "success",
    });
    navigateTo("/categories");
  } catch (err) {
    let message = err.data?.message || "Não foi possivel criar categoria!";
    if (err.data?.code == "CATEGORY_EXCEEDED_LEVELS") {
      message =
        "Você está tentando criar uma estrutura com mais de 2 niveis de subcategorias, favor revisar e tentar novamente!";
    }
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
