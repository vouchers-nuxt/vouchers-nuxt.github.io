<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              Categoria #{{ category.id }}
            </h6>
          </div>
          <div class="card-body">
            <p>Nome: {{ category.name || "N/A" }}</p>
            <p>Descrição: {{ category.description || "N/A" }}</p>
            <p>Subcategorias:</p>
            <div class="table-responsive">
              <table
                id="tree"
                class="table table-sm table-bordered table-striped"
              >
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Nome</td>
                    <td>Descrição</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in category.subcategories">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $blockui } = useNuxtApp();
import { useCategoriesStore } from "../../../stores/categories";
import { storeToRefs } from "pinia";

const route = useRoute();
const categoryStore = useCategoriesStore();
const { getCategory } = storeToRefs(categoryStore);

const { id } = route.params;
let category = ref(useState("category", () => ({})));

onMounted(async () => {
  $blockui().start();
  category.value = getCategory.value(id) ?? (await categoryStore.findById(id));
  $blockui().stop();
});
</script>
