<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Categorias</h1>
      <NuxtLink
        v-if="$can('create_categories').value"
        to="/categories/create"
        class="d-inline-block btn btn-sm btn-primary shadow-sm"
      >
        Criar Novo</NuxtLink
      >
    </div>

    <hr />

    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive" style="min-height: 300px">
              <div class="d-flex">
                <div class="dataTables_length" id="tree_length">
                  <label for="" style="display: inline-block;">
                    <select
                      v-model="perPage"
                      style="display: inline-block; width: auto;"
                      class="form-select form-select-sm"
                      id=""
                    >
                      <option value="10">10</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    Resultados por página
                  </label>
                </div>
              </div>
              <table
                id="tree"
                class="table table-sm table-bordered table-striped"
              >
                <thead>
                  <tr>
                    <td>*</td>
                    <td>ID</td>
                    <td>Nome</td>
                    <td>Descrição</td>
                    <td>Opções</td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :class="treeClass(item)"
                    @click="(e) => openCategory(e, item.id)"
                    v-for="item in categoriesPaginate.data"
                  >
                    <td style="width: 50px"></td>
                    <td style="vertical-align: middle">{{ item.id }}</td>
                    <td style="vertical-align: middle">{{ item.name }}</td>
                    <td style="vertical-align: middle">
                      {{ item.description }}
                    </td>
                    <td style="vertical-align: middle" id="options">
                      <div>
                        <div class="btn-group">
                          <button
                            :disabled="
                              !(
                                $can('create_categories').value ||
                                $can('update_categories').value ||
                                $can('delete_categories').value
                              )
                            "
                            class="btn btn-secondary btn-sm dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Opções
                          </button>
                          <ul class="dropdown-menu">
                            <li v-if="$can('update_categories').value">
                              <NuxtLink
                                onclick="javascript:void(0)"
                                class="dropdown-item"
                                :to="`/categories/${item.id}/edit`"
                                >Editar</NuxtLink
                              >
                            </li>
                            <li
                              v-if="
                                item.level < 2 &&
                                  $can('create_categories').value
                              "
                            >
                              <button
                                class="dropdown-item"
                                @click="() => selectCategory(item)"
                              >
                                Criar Subcategoria
                              </button>
                            </li>
                            <li v-if="$can('delete_categories').value">
                              <a class="dropdown-item" @click="destroy(item)"
                                >Excluir</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <TablePaginate
                :currentPage="categoriesPaginate.meta?.current_page"
                :lastPage="categoriesPaginate.meta?.last_page"
                :total="categoriesPaginate.meta?.total"
                @next="next"
                @preview="preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CategoriesModal
      v-model:subcategory="subcategory"
      @close="closeModalSubcategory"
      @submit="createSubcategory"
      :parentCategory="categorySelected"
    />
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";
import { useCategoriesStore } from "@/stores/categories";

const { $blockui } = useNuxtApp();
const categoriesStore = useCategoriesStore();

let page = useState("page", () => 1);
let perPage = useState("perPage", () => "10");
let subcategory = useState("subcategory", () => ({}));
let categorySelected = useState("categorySelected", () => ({}));
const { categoriesPaginate } = storeToRefs(categoriesStore);

let modalSubcategory;

async function getCategories() {
  $blockui().start();
  await categoriesStore.paginate(page.value, perPage.value);
  $("#tree").treegrid();
  $blockui().stop();
}

function treeClass(item) {
  return `treegrid-${item.id} ${
    item.parent_category_id ? `treegrid-parent-${item.parent_category_id}` : ""
  }`;
}

watch(perPage, async (newValue) => {
  await getCategories();
});

onMounted(async () => {
  await getCategories();
});

function selectCategory(item) {
  categorySelected.value = item;
  subcategory.value = {};
  modalSubcategory = new bootstrap.Modal(
    document.getElementById("exampleModal")
  );
  modalSubcategory.show();
}

function closeModalSubcategory() {
  modalSubcategory.hide();
}

async function createSubcategory() {
  try {
    $blockui().start();
    await categoriesStore.create({
      ...subcategory.value,
      parent_category_id: categorySelected.value?.id,
    });
    Swal.fire({
      title: "Oba!",
      text: "Categoria criada com sucesso!",
      icon: "success",
    });
    await getCategories();
    modalSubcategory.hide();
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

function openCategory(e, id) {
  if (e.target.localName == "td") {
    navigateTo(`/categories/${id}`);
  }
}

function destroy(item) {
  try {
    Swal.fire({
      title: "Atenção",
      icon: "warning",
      text: `Ao excluir uma categoria todas as categorias filhas serão excluidas também, deseja proseguir?`,
      confirmButtonText: "Sim, deletar!",
      showCancelButton: true,
      cancelButtonText: "Não!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        $blockui().start();
        await categoriesStore.destroy(item.id);
        await getCategories();
        $blockui().stop();
      }
    });
  } catch (err) {
    let message = err.data?.message || "Não foi possivel excluir categoria!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }
}

async function preview() {
  page.value > 1 ? page.value-- : page.value;
  await getCategories();
}

async function next() {
  page.value < categoriesPaginate.value.meta.last_page
    ? page.value++
    : page.value;
  await getCategories();
}
</script>
