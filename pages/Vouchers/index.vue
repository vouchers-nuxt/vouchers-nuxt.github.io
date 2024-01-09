<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Vales</h1>
      <NuxtLink
        v-if="$can('create_vouchers').value"
        to="/vouchers/create"
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
                id="table-vouchers"
                class="table table-sm table-bordered table-striped"
                style="width: 100%"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuário</th>
                    <th>Departamento</th>
                    <th>Cateogria</th>
                    <th>Valor</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    @click="(e) => openVouchers(e, item.id)"
                    v-for="item in vouchersPaginate.data"
                  >
                    <td>{{ item.id }}</td>
                    <td>{{ item.user?.name || "N/A" }}</td>
                    <td>{{ item.department?.name || "N/A" }}</td>
                    <td>{{ item.category?.name || "N/A" }}</td>
                    <td>{{ item.value || "N/A" }}</td>
                    <td>
                      <div class="btn-group">
                        <button
                          class="btn btn-secondary btn-sm dropdown-toggle"
                          type="button"
                          :disabled="!$can('delete_vouchers').value"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Opções
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              v-if="$can('delete_vouchers').value"
                              @click="destroy(item)"
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
                :currentPage="vouchersPaginate.meta?.current_page"
                :lastPage="vouchersPaginate.meta?.last_page"
                :total="vouchersPaginate.meta?.total"
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
import { useVouchersStore } from "../../stores/vouchers";
import { storeToRefs } from "pinia";

const voucherStore = useVouchersStore();
const { $blockui } = useNuxtApp();

let { vouchersPaginate } = storeToRefs(voucherStore);
let page = useState("page", () => 1);
let perPage = useState("perPage", () => 10);
let table;

watch(perPage, async () => {
  await getVouchers();
});

async function getVouchers() {
  $blockui().start();
  await voucherStore.paginate(page.value, perPage.value);

  $blockui().stop();
}

onMounted(async () => {
  await getVouchers();
});

async function preview() {
  $blockui().start();
  page.value > 1 ? page.value-- : page.value;
  await voucherStore.paginate(page.value, perPage.value);
  $blockui().stop();
}

async function next() {
  $blockui().start();
  page.value < vouchersPaginate.value.meta.last_page
    ? page.value++
    : page.value;
  await voucherStore.paginate(page.value, perPage.value);
  $blockui().stop();
}

function openVouchers(e, id) {
  if (e.target.localName == "td") {
    navigateTo(`/vouchers/${id}`);
  }
}

async function destroy(item) {
  try {
    Swal.fire({
      title: "Atenção",
      icon: "warning",
      text: `Deseja realmente excluir o vale: ${item.id}`,
      confirmButtonText: "Sim, deletar!",
      showCancelButton: true,
      cancelButtonText: "Não!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        $blockui().start();
        await voucherStore.destroy(item.id);
        await voucherStore.paginate(page.value, perPage.value);
        $blockui().stop();
      }
    });
  } catch (err) {
    let message = err.data?.message || "Não foi possivel excluir vale!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }
}
</script>
