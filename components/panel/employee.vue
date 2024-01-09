import type { VouchersForm } from '#build/components';
<template>
  <!-- Content Row -->
  <div class="row">
    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-primary text-uppercase mb-1"
              >
                Vales (Mês)
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">
                {{ metrics.count_month }}
              </div>
            </div>
            <div class="col-auto">
              <i class="bi bi-ticket-perforated-fill fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-success text-uppercase mb-1"
              >
                Total em vales (Mês)
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">
                R${{ $mask(metrics.sum_month) }}
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-success text-uppercase mb-1"
              >
                Total em vales (Anual)
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">
                R${{ $mask(metrics.sum_year) }}
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div
                class="text-xs font-weight-bold text-success text-uppercase mb-1"
              >
                Vales (Anual)
              </div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">
                {{ metrics.count_year }}
              </div>
            </div>
            <div class="col-auto">
              <i class="bi bi-ticket-perforated-fill fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Content Row -->

  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div
          class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">Seus Vales</h6>
          <div class="dropdown no-arrow">
            <NuxtLink
              to="/vouchers/create"
              class=" d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              ><i class="bi bi-ticket-detailed"></i> Solicitar um Vale</NuxtLink
            >
          </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <div class="table-responsive">
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
                        <li v-if="$can('delete_vouchers').value">
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
              :currentPage="vouchersPaginate.meta?.current_page || page"
              :lastPage="vouchersPaginate.meta?.last_page"
              :total="vouchersPaginate.meta?.total"
              @next="next"
              @preview="preview"
            />
          </div>
        </div>
      </div>
    </div></div
></template>

<script setup>
import Swal from "sweetalert2";
import { useVouchersStore } from "@/stores/vouchers";
import { storeToRefs } from "pinia";

const voucherStore = useVouchersStore();

let table;
const { $blockui } = useNuxtApp();
const { vouchersPaginate, metrics } = storeToRefs(voucherStore);
let page = useState("page", () => 1);
let perPage = useState("perPage", () => 10);

watch(perPage, async () => {
  await getVouchers();
});

onMounted(async () => {
  await getVouchers();
  await voucherStore.getMetricsUser();
});

async function getVouchers() {
  try {
    $blockui().start();
    await voucherStore.paginateVoucherUser(page.value, perPage.value);
  } catch (err) {
    const errData = err;
    const message =
      errData?.data?.message ||
      "Não foi possivel recuperar informações de Vales!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  } finally {
    $blockui().stop();
  }
}

function openVouchers(e, id) {
  if (e.target.localName == "td") {
    navigateTo(`/vouchers/${id}`);
  }
}

async function preview() {
  page.value > 1 ? page.value-- : page.value;
  await getVouchers();
}

async function next() {
  page.value < vouchersPaginate.value.meta.last_page
    ? page.value++
    : page.value;
  await getVouchers();
}
</script>
