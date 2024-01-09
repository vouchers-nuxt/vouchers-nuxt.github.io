<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Orçamento</h1>
      <NuxtLink
        v-if="$can('create_budgets').value"
        to="/budgets/create"
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
                    @click="(e) => openBudgets(e, item.id)"
                    v-for="item in budgetsPaginate.data"
                  >
                    <td style="width: 50px"></td>
                    <td style="vertical-align: middle">{{ item.id }}</td>
                    <td style="vertical-align: middle">
                      R$ {{ $mask(item.value) }}
                    </td>
                    <td style="vertical-align: middle">
                      {{ item.department.name }}
                    </td>
                    <td style="vertical-align: middle" id="options">
                      <div class="btn-group">
                        <button
                          :disabled="
                            !(
                              $can('delete_budgets').value ||
                              $can('update_budgets').value
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
                          <li v-if="$can('update_budgets').value">
                            <NuxtLink
                              onclick="javascript:void(0)"
                              class="dropdown-item"
                              :to="`/budgets/${item.id}/edit`"
                              >Editar</NuxtLink
                            >
                          </li>
                          <li v-if="$can('delete_budgets').value">
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
                :currentPage="budgetsPaginate.meta?.current_page"
                :lastPage="budgetsPaginate.meta?.last_page"
                :total="budgetsPaginate.meta?.total"
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
import { storeToRefs } from "pinia";
import { useBudgetsStore } from "@/stores/budgets";

const { $blockui, $mask } = useNuxtApp();
const budgetsStore = useBudgetsStore();

let page = useState("page", () => 1);
let perPage = useState("perPage", () => "10");
const { budgetsPaginate } = storeToRefs(budgetsStore);

watch(perPage, async () => {
  await getBudgets();
});

async function getBudgets() {
  $blockui().start();
  await budgetsStore.paginate(page.value, perPage.value);
  $blockui().stop();
}

onMounted(async () => {
  await getBudgets();
});

function openBudgets(e, id) {
  if (e.target.localName == "td") {
    navigateTo(`/budgets/${id}`);
  }
}

async function destroy(item) {
  try {
    Swal.fire({
      title: "Atenção",
      icon: "warning",
      text: `Deseja realmente excluir o orçamento: ${item.id}`,
      confirmButtonText: "Sim, deletar!",
      showCancelButton: true,
      cancelButtonText: "Não!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        $blockui().start();
        await budgetsStore.destroy(item.id);
        await budgetsStore.paginate(page.value, perPage.value);
        $blockui().stop();
      }
    });
  } catch (err) {
    let message = err.data?.message || "Não foi possivel excluir orçamento!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }
}

async function preview() {
  page.value > 1 ? page.value-- : page.value;
  await getBudgets();
}

async function next() {
  page.value < budgetsPaginate.value.meta.last_page ? page.value++ : page.value;
  await getBudgets();
}
</script>

<style lang="scss" scoped></style>
