<template>
  <table
    id="table-vouchers"
    class="table table-sm table-bordered table-striped"
    style="width: 100%"
  >
    <thead>
      <tr>
        <th>ID</th>
        <th>Funcionário</th>
        <th>Departamento</th>
        <th>Cateogria</th>
        <th>Responsáveis</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in approvalRequestsPaginate.data"
        @click="(e) => $emit('open', e, item.voucher.id)"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.voucher?.user?.name || "N/A" }}</td>
        <td>{{ item.voucher?.department?.name || "N/A" }}</td>
        <td>{{ item.voucher?.category?.name || "N/A" }}</td>
        <td>
          <AtomicsUserGroups :users="item.voucher?.approvals" />
        </td>
        <td class="no-wrap">
          <p class="mb-0">R${{ $mask(item.voucher.value) || "N/A" }}</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  approvalRequestsPaginate: Object,
});

defineEmits(["open"]);

const { $mask } = useNuxtApp();
</script>
