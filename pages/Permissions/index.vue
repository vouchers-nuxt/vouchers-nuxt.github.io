<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Permissões</h1>
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
                id="table-permissions"
                class="table table-sm table-bordered table-striped"
                style="width: 100%"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Apelido</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in permissionsPagiante.data">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.slug || "N/A" }}</td>
                    <td>{{ item.description || "N/A" }}</td>
                  </tr>
                </tbody>
              </table>
              <TablePaginate
                :currentPage="permissionsPagiante.meta?.current_page"
                :lastPage="permissionsPagiante.meta?.last_page"
                :total="permissionsPagiante.meta?.total"
                @next="next"
                @preview="preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePermissionsStore } from "@/stores/permissions";
import { storeToRefs } from "pinia";

const permissionStore = usePermissionsStore();
const { $blockui } = useNuxtApp();
let table;

let { permissionsPagiante } = storeToRefs(permissionStore);
let page = useState("page", () => 1);
let perPage = useState("perPage", () => 10);

watch(perPage, async () => {
  await getPermissions();
});

async function getPermissions() {
  $blockui().start();
  await permissionStore.paginate(page.value, perPage.value);

  $blockui().stop();
}

onMounted(async () => {
  await getPermissions();
});

onBeforeUnmount(() => {
  perPage.value = 10;
  page.value = 1;
  table?.destroy();
});

async function preview() {
  page.value > 1 ? page.value-- : page.value;
  await getPermissions();
}

async function next() {
  page.value < permissionsPagiante.value.meta.last_page
    ? page.value++
    : page.value;
  await getPermissions();
}
</script>
