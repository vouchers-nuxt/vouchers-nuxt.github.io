<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              {{ !department?.id ? "Criar" : "Editar" }} departamento
            </h6>
          </div>
          <form @submit="(e) => $emit('submit', e)">
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-sm-4 mb-3">
                  <label for="name" class="form-label">Nome</label>
                  <input
                    type="text"
                    v-model="department.name"
                    class="form-control"
                    id="name"
                    required
                    placeholder="Nome"
                  />
                </div>
                <div class="col-12 col-sm-4 mb-3">
                  <label for="description" class="form-label">Descrição</label>
                  <input
                    type="text"
                    v-model="department.description"
                    class="form-control"
                    id="description"
                    placeholder="Descrição"
                  />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-12 col-sm-4 mb-3">
                  <label for="users" class="form-label">Gestor</label>
                  <VueMultiselect
                    placeholder="Usuários"
                    track-by="name"
                    label="name"
                    v-model="department.manager"
                    :options="users"
                    @search-change="(value) => $emit('onSearchUsers', value)"
                  ></VueMultiselect>
                </div>
              </div>

              <hr />
            </div>
            <div class="card-footer">
              <button class="btn btn-info" type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  department: Object,
  users: Array,
});

defineEmits(["onSearchUsers", "submit"]);

// onMounted(() => {
//   $(".dd").nestable({
//     /* config options */
//   });
// });
</script>
