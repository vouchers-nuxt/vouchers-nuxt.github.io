<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              {{ !user?.id ? "Criar" : "Editar" }} usuário
            </h6>
          </div>
          <form @submit="(e) => $emit('submit', e)">
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-sm-4 mb-3">
                  <label for="name" class="form-label">Nome</label>
                  <input
                    type="text"
                    v-model="user.name"
                    class="form-control"
                    id="name"
                    required
                    placeholder="Nome"
                  />
                </div>
                <div class="col-12 col-sm-4 mb-3">
                  <label for="username" class="form-label">Usuário</label>
                  <input
                    type="text"
                    v-model="user.username"
                    class="form-control"
                    id="username"
                    required
                    placeholder="Usuário"
                  />
                </div>
                <div class="col-12 col-sm-4 mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    v-model="user.email"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-4 mb-3">
                  <label for="password" class="form-label">Senha *</label>
                  <input
                    type="password"
                    v-model="user.password"
                    class="form-control"
                    id="password"
                    placeholder="Senha"
                  />
                  <div id="validationServer03Feedback" class="invalid-feedback">
                    {{ passwordError }}
                  </div>
                </div>
                <div class="col-12 col-sm-4 mb-3">
                  <label for="password_confirmation" class="form-label"
                    >Confirmar senha *</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password_confirmation"
                    id="password_confirmation"
                    placeholder="Confirmar senha"
                  />
                  <div id="validationServer03Feedback" class="invalid-feedback">
                    {{ passwordConfirmationError }}
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-12 col-sm-4 mb-3">
                  <label for="roles" class="form-label">Cargos</label>
                  <VueMultiselect
                    placeholder="Cargos"
                    track-by="name"
                    label="name"
                    v-model="user.roles"
                    :multiple="true"
                    :options="roles"
                    @search-change="(value) => $emit('onSearchRoles', value)"
                  ></VueMultiselect>
                </div>
                <div class="col-12 col-sm-4 mb-3">
                  <label for="roles" class="form-label"
                    >Permissões adicionais</label
                  >
                  <VueMultiselect
                    placeholder="Permissões adicionais"
                    track-by="name"
                    label="name"
                    v-model="user.permissions"
                    :multiple="true"
                    :options="permissions"
                    @search-change="
                      (value) => $emit('onSearchPermissions', value)
                    "
                  ></VueMultiselect>
                </div>
                <div class="col-12 col-sm-4 mb-3">
                  <label for="roles" class="form-label">Departamentos</label>
                  <VueMultiselect
                    placeholder="Departamentos"
                    track-by="name"
                    label="name"
                    v-model="user.departments"
                    :multiple="true"
                    :options="departments"
                    @search-change="
                      (value) => $emit('onSearchDepartments', value)
                    "
                  ></VueMultiselect>
                </div>
              </div>
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
  user: Object,
  roles: Array,
  permissions: Array,
  passwordConfirmationError: String,
  passwordError: String,
  departments: Array,
});

defineEmits([
  "onSearchRoles",
  "onSearchPermissions",
  "submit",
  "onSearchDepartments",
]);
</script>
