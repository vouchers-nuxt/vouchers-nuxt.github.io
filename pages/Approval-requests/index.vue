<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Vales pendentes de liberação</h1>
    </div>

    <hr />

    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header py-3 d-flex flex-row align-items-center ">
            <button
              @click="() => (allVouchers = true)"
              :class="
                `btn btn-sm ${
                  allVouchers ? 'btn-info' : 'btn-outline-secondary'
                } font-weight-bold  mr-2`
              "
              id="all-vouchers"
            >
              Todos Vales
            </button>
            <button
              :class="
                `btn btn-sm ${
                  !allVouchers ? 'btn-info' : 'btn-outline-secondary'
                } font-weight-bold`
              "
              @click="() => (allVouchers = false)"
              id="my-vouchers"
            >
              Meus Vales
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive" style="min-height: 300px">
              <ApprovalRequestsTableAllVouchers
                v-if="allVouchers"
                @open="openVouchers"
                :approvalRequestsPaginate="approvalRequestsPaginate"
              />
              <ApprovalRequestsTableUserVouchers
                v-else
                @approve="approve"
                @open="openVouchers"
                @refuse="refuse"
                :approvalRequestsPaginate="approvalRequestsPaginate"
              />
              <TablePaginate
                :currentPage="approvalRequestsPaginate.meta?.current_page"
                :lastPage="approvalRequestsPaginate.meta?.last_page"
                :total="approvalRequestsPaginate.meta?.total"
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
import { useApprovalRequestsStore } from "@/stores/approvalRequests";
import { storeToRefs } from "pinia";

const approvalRequestStore = useApprovalRequestsStore();

const { $blockui, $can } = useNuxtApp();
const { approvalRequestsPaginate } = storeToRefs(approvalRequestStore);

let allVouchers = useState("allVouchers", () => true);
let page = useState("page", () => 1);
let perPage = useState("perPage", () => 10);

watch(perPage, async () => {
  console.log("==dff");
  if (allVouchers.value) return await getApprovalRequest();
  else return await getApprovalRequestByUser();
});

async function getApprovalRequestByUser() {
  $blockui().start();
  await approvalRequestStore.approvalRequestByUserPaginate(
    page.value,
    perPage.value
  );
  $blockui().stop();
}

async function getApprovalRequest() {
  $blockui().start();
  await approvalRequestStore.approvalRequests(page.value, perPage.value);
  $blockui().stop();
}

onMounted(async () => {
  await getApprovalRequest();
});

watch(allVouchers, async (newValue) => {
  if (newValue) {
    await getApprovalRequest();
  } else {
    await getApprovalRequestByUser();
  }
});

async function preview() {
  page.value > 1 ? page.value-- : page.value;
  getApprovalRequestByUser();
}

async function next() {
  page.value < approvalRequestsPaginate.value.meta.last_page
    ? page.value++
    : page.value;
  getApprovalRequestByUser();
}

function openVouchers(e, id) {
  if ($can("read_vouchers").value) {
    if (e.target.localName == "td") {
      navigateTo(`/vouchers/${id}`);
    }
  }
}

function refuse(item) {
  try {
    Swal.fire({
      title: "Atenção",
      icon: "warning",
      text: `Deseja realmente recusar a liberação do vale: ${item.voucher.id}? Não poderá alterar a decisão`,
      confirmButtonText: "Sim, recusar!",
      showCancelButton: true,
      cancelButtonText: "Não!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        $blockui().start();
        await approvalRequestStore.update(item.id, { approved: 0 });
        await approvalRequestStore.approvalRequestByUserPaginate(
          page.value,
          perPage.value
        );
        $blockui().stop();
      }
    });
  } catch (err) {
    let message = err.data?.message || "Não foi possivel recusar vale!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }
}

function approve(item) {
  try {
    Swal.fire({
      title: "Atenção",
      icon: "warning",
      text: `Deseja realmente aprovar a liberação do vale: ${item.voucher.id}? Não poderá alterar a decisão`,
      confirmButtonText: "Sim, aprovar!",
      showCancelButton: true,
      cancelButtonText: "Não!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        $blockui().start();
        await approvalRequestStore.update(item.id, { approved: 1 });
        await approvalRequestStore.approvalRequestByUserPaginate(
          page.value,
          perPage.value
        );
        $blockui().stop();
      }
    });
  } catch (err) {
    let message = err.data?.message || "Não foi possivel aprovar vale!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }
}
</script>
