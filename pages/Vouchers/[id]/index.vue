<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              Vale #{{ voucher?.id || 0 }}
            </h6>
          </div>
          <div class="card-body">
            <p>Date: {{ $dateTime(voucher.date, "dd/LL/yyyy") || "N/A" }}</p>
            <p>Valor: {{ $mask(voucher.value) || "N/A" }}</p>
            <p>Departamento: {{ voucher.department?.name || "N/A" }}</p>
            <p>Categoria: {{ voucher.category?.name || "N/A" }}</p>
            <p class="d-inline-flex">
              Gestores delegados para liberação do vale: &ensp;
              <div v-for="(item, index) in voucher.user_approvals">
                  <span
                    class="badge bg-secondary"
                    >{{ item.name }}</span
                  >{{ index < voucher.user_approvals.length -1 ? ',' : '' }}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVouchersStore } from "@/stores/vouchers";

const { $blockui, $dateTime, $mask } = useNuxtApp();
const route = useRoute();
const voucherStore = useVouchersStore();

const voucher = useState("voucher", () => ({}));
const id = route.params.id;

onMounted(async () => {
  $blockui().start();
  voucher.value = await voucherStore.find(id);
  $blockui().stop();
});
</script>
