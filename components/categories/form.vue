<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              {{ !category?.id ? "Criar" : "Editar" }} categoria
            </h6>
          </div>
          <form @submit="(e) => $emit('submit', e)">
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-sm-4 mb-3">
                  <label for="name" class="form-label">Nome</label>
                  <input
                    type="text"
                    v-model="category.name"
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
                    v-model="category.description"
                    class="form-control"
                    id="description"
                    placeholder="Descrição"
                  />
                </div>
                <div class="col-12 col-sm-4 mb-3">
                  <label for="subcategories" class="form-label"
                    >Categoria pai
                  </label>
                  <VueMultiselect
                    placeholder="Digite para buscar categorias"
                    noOptions="Sem registros"
                    track-by="name"
                    label="name"
                    v-model="category.parentCategory"
                    :options="categories"
                    @search-change="
                      (value) => $emit('onSearchCategories', value)
                    "
                    ><template v-slot:noOptions
                      >Sem registros</template
                    ></VueMultiselect
                  >
                  <small
                    >Deixe em branco caso queira criar uma categoria
                    raiz.</small
                  >
                </div>
              </div>
              <hr />

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
  category: Object,
  categories: Array,
});

defineEmits(["submit", "onSearchCategories"]);
</script>

<style>
.dd-item > button.dd-collapse:before {
  z-index: 1;
}
.dd-item > button.dd-expand:before {
  z-index: 1;
}
.dd-handle,
.dd-nodrag {
  display: block !important;
}
</style>
