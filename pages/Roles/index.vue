<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Cargos</h1>
      <NuxtLink
        v-if="$can('create_roles').value"
        to="/roles/create"
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
                id="table-roles"
                class="table table-sm table-bordered table-striped"
                style="width: 100%"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    @click="(e) => openRoles(e, item.id)"
                    v-for="item in rolesPaginate.data"
                  >
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description || "N/A" }}</td>
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
                          <li v-if="$can('update_roles').value">
                            <NuxtLink
                              class="dropdown-item"
                              :to="`/roles/${item.id}/edit`"
                              >Editar</NuxtLink
                            >
                          </li>
                          <li v-if="$can('delete_roles').value">
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
                :currentPage="rolesPaginate.meta?.current_page"
                :lastPage="rolesPaginate.meta?.last_page"
                :total="rolesPaginate.meta?.total"
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
import { useRolesStore } from "@/stores/roles";
import { storeToRefs } from "pinia";

const roleStore = useRolesStore();
const { $blockui } = useNuxtApp();

let { rolesPaginate } = storeToRefs(roleStore);
let page = useState("page", () => 1);
let perPage = useState("perPage", () => 10);
let table;

watch(perPage, async () => {
  await getRoles();
});

async function getRoles() {
  $blockui().start();
  await roleStore.paginate(page.value, perPage.value);

  $blockui().stop();
}

onMounted(async () => {
  await getRoles();
});

onBeforeUnmount(() => {
  perPage.value = 10;
  page.value = 1;
  table?.destroy();
});

async function preview() {
  $blockui().start();
  page.value > 1 ? page.value-- : page.value;
  await roleStore.paginate(page.value, perPage.value);
  $blockui().stop();
}

function openRoles(e, id) {
  if (e.target.localName == "td") {
    navigateTo(`/roles/${id}`);
  }
}

async function next() {
  $blockui().start();
  page.value < roles.value.meta.last_page ? page.value++ : page.value;
  await roleStore.paginate(page.value, perPage.value);
  $blockui().stop();
}

async function destroy(item) {
  try {
    Swal.fire({
      title: "Atenção",
      icon: "warning",
      text: `Deseja realmente excluir o cargo: ${item.name}`,
      confirmButtonText: "Sim, deletar!",
      showCancelButton: true,
      cancelButtonText: "Não!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        $blockui().start();
        await roleStore.destroy(item.id);
        await roleStore.paginate(page.value, perPage.value);
        $blockui().stop();
      }
    });
  } catch (err) {
    let message = err.data?.message || "Não foi possivel criar usuário!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
}
</script>
