<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Usuários</h1>
      <NuxtLink
        v-if="$can('create_users').value"
        to="/users/create"
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
                id="table-users"
                class="table table-sm table-bordered table-striped"
                style="width: 100%"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Usuário</th>
                    <th>E-mail</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    @click="(e) => openUser(e, item.id)"
                    v-for="item in usersPaginate.data"
                  >
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.email || "N/A" }}</td>
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
                          <li>
                            <NuxtLink
                              v-if="$can('update_users').value"
                              onclick="javascript:void(0)"
                              class="dropdown-item"
                              :to="`/users/${item.id}/edit`"
                              >Editar</NuxtLink
                            >
                          </li>
                          <li v-if="$can('delete_users').value">
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
                :currentPage="usersPaginate.meta?.current_page"
                :lastPage="usersPaginate.meta?.last_page"
                :total="usersPaginate.meta?.total"
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
const { $blockui } = useNuxtApp();
import { storeToRefs } from "pinia";
import { useUsersStore } from "~/stores/users/index";

const userStore = useUsersStore();
let { usersPaginate } = storeToRefs(userStore);

let page = useState("page", () => 1);
let perPage = useState("perPage", () => 10);
let table;

watch(perPage, async () => {
  await getUsers();
});

async function getUsers() {
  $blockui().start();
  await userStore.getUsersPaginate(page.value, perPage.value);

  $blockui().stop();
}

onMounted(async () => {
  await getUsers();
});

onBeforeUnmount(() => {
  perPage.value = 10;
  page.value = 1;
  table?.destroy();
});

function openUser(e, id) {
  if (e.target.localName == "td") {
    navigateTo(`/users/${id}`);
  }
}

async function destroy(item) {
  try {
    Swal.fire({
      title: "Atenção",
      icon: "warning",
      text: `Deseja realmente excluir o usuário: ${item.name}`,
      confirmButtonText: "Sim, deletar!",
      showCancelButton: true,
      cancelButtonText: "Não!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        $blockui().start();
        await userStore.destroyUser(item.id);
        await userStore.getUsersPaginate(page, perPage);
        $blockui().stop();
      }
    });
  } catch (err) {
    let message = err.data?.message || "Não foi possivel excluir usuário!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }
}

async function preview() {
  page.value > 1 ? page.value-- : page.value;
  await getUsers();
}

async function next() {
  page.value < usersPaginate.value.meta.last_page ? page.value++ : page.value;
  await getUsers();
}
</script>
