<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              {{ !voucher?.id ? "Criar" : "Editar" }} vale
            </h6>
          </div>
          <form @submit="(e) => $emit('submit', e)">
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-sm-3 mb-3">
                  <label for="name" class="form-label">Data</label>
                  <input
                    type="date"
                    v-model="voucher.date"
                    class="form-control"
                    id="date"
                    required
                    placeholder="Data"
                  />
                </div>
                <div class="col-12 col-sm-3 mb-3">
                  <label for="name" class="form-label">Valor</label>
                  <input
                    type="text"
                    v-mask
                    v-model="voucher.value"
                    class="form-control"
                    id="value"
                    required
                    placeholder="valor"
                  />
                </div>
                <div class="col-12 col-sm-3 mb-3">
                  <label for="roles" class="form-label">Departamento</label>
                  <VueMultiselect
                    placeholder="Departamento"
                    track-by="name"
                    label="name"
                    v-model="voucher.department"
                    :options="departments"
                    @search-change="
                      (value) => $emit('onSearchDepartment', value)
                    "
                  ></VueMultiselect>
                  <small
                    >É possivel solicitar vales apenas para os departamentos que
                    você pertence.</small
                  >
                </div>
                <div class="col-12 col-sm-3 mb-3">
                  <label for="roles" class="form-label">Categoria</label>
                  <VueMultiselect
                    placeholder="Categoria"
                    track-by="name"
                    label="name"
                    v-model="voucher.category"
                    :options="categories"
                    @search-change="(value) => $emit('onSearchCategory', value)"
                  >
                    <template v-slot:noOptions
                      >Digite o nome da Categoria</template
                    ></VueMultiselect
                  >
                  <small
                    >Apenas as categorias que possuem orçamento para o Mês e
                    Departamento selecionados serão exibidos</small
                  >
                </div>
              </div>
              <hr v-if="requiredManager || voucher.user_approvals?.length" />
              <div
                class="row"
                v-if="requiredManager || voucher.user_approvals?.length"
              >
                <div class="col">
                  Solicitar aprovação:
                </div>
                <div class="row">
                  <div class="col-12 col-sm-3 mb-3">
                    <label for="name" class="form-label">Gestor:</label>
                    <VueMultiselect
                      placeholder="Gestores"
                      track-by="name"
                      label="name"
                      v-model="voucher.user_approvals"
                      :multiple="true"
                      :options="users"
                      @search-change="(value) => $emit('onSearchUsers', value)"
                    >
                      <template v-slot:noOptions
                        >Digite o nome de um Gestor</template
                      ></VueMultiselect
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-info" type="submit">
                {{ voucher.id ? "Atualizar" : "Salvar" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  voucher: Object,
  departments: Array,
  categories: Array,
  users: Array,
  requiredManager: Boolean,
});

defineEmits([
  "submit",
  "onSearchDepartment",
  "onSearchCategory",
  "onSearchUsers",
]);
</script>
