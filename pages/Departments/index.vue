<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Departamentos</h1>
      <NuxtLink
        v-if="$can('create_departments').value"
        to="/departments/create"
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
                id="table-departments"
                class="table table-sm table-bordered table-striped"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Descrição</th>
                    <th>Gestor</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    @click="(e) => openDepartment(e, item.id)"
                    v-for="item in departmentsPaginate.data"
                  >
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description || "N/A" }}</td>
                    <td>{{ item.manager?.name || "N/A" }}</td>
                    <td>
                      <div class="btn-group">
                        <button
                          class="btn btn-secondary btn-sm dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Opções
                        </button>
                        <ul class="dropdown-menu">
                          <li v-if="$can('update_departments').value">
                            <NuxtLink
                              onclick="javascript:void(0)"
                              class="dropdown-item"
                              :to="`/departments/${item.id}/edit`"
                              >Editar</NuxtLink
                            >
                          </li>
                          <li v-if="$can('delete_departments').value">
                            <a class="dropdown-item" @click="destroy(item)"
                              >Excluir</a
                            >
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <TablePaginate
                :currentPage="departmentsPaginate.meta?.current_page"
                :lastPage="departmentsPaginate.meta?.last_page"
                :total="departmentsPaginate.meta?.total"
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
import Swal from "sweetalert2";
import { useDepartmentsStore } from "@/stores/departments";
import { storeToRefs } from "#imports";

const { $blockui } = useNuxtApp();
const departmentStore = useDepartmentsStore();
const { departmentsPaginate } = storeToRefs(departmentStore);

let page = useState("page", () => 1);
let perPage = useState("perPage", () => 10);
let table;

watch(perPage, async () => {
  await getDepartments();
});

onBeforeUnmount(() => {
  perPage.value = 10;
  page.value = 1;
  table?.destroy();
});

async function getDepartments() {
  $blockui().start();
  await departmentStore.paginate(page.value, perPage.value);

  $blockui().stop();
}

onMounted(async () => {
  await getDepartments();
});

function openDepartment(e, id) {
  if (e.target.localName == "td") {
    navigateTo(`/departments/${id}`);
  }
}

async function preview() {
  page.value > 1 ? page.value-- : page.value;
  await getDepartments();
}

async function next() {
  page.value < departmentsPaginate.value.meta.last_page
    ? page.value++
    : page.value;
  await getDepartments();
}

async function destroy(item) {
  try {
    Swal.fire({
      title: "Atenção",
      icon: "warning",
      text: `Deseja realmente excluir o departamento: ${item.name}`,
      confirmButtonText: "Sim, deletar!",
      showCancelButton: true,
      cancelButtonText: "Não!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        $blockui().start();
        await departmentStore.destroy(item.id);
        await departmentStore.paginate(page.value, perPage.value);
        $blockui().stop();
      }
    });
  } catch (err) {
    console.log(err);
    let message = err.data?.message || "Não foi possivel excluir departamento!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }
}
</script>
