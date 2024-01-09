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
        <th>Opções</th>
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
        <td>
          <div class="btn-group">
            <button
              class="btn btn-secondary btn-sm dropdown-toggle"
              type="button"
              :disabled="item.approved != null"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Opções
            </button>
            <ul class="dropdown-menu">
              <li v-if="$can('update_approvals_vouchers').value">
                <a
                  href="#"
                  v-if="item.approved == false || item.approved == null"
                  class="dropdown-item"
                  @click="$emit('approve', item)"
                  >Aprovar</a
                >
              </li>
              <li v-if="$can('update_approvals_vouchers').value">
                <a
                  href="#"
                  class="dropdown-item"
                  @click="$emit('refuse', item)"
                  v-if="item.approved == true || item.approved == null"
                  >Reprovar</a
                >
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  approvalRequestsPaginate: Object,
});

defineEmits(["approve", "refuse", "open"]);

const { $mask } = useNuxtApp();
</script>
