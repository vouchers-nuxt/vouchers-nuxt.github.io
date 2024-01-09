<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Criar subcategoria {{ parentCategory.id }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <label for="name" class="form-label">Nome</label>
              <input
                type="text"
                v-model="subcategory.name"
                class="form-control"
                id="name"
                required
                placeholder="Nome"
              />
            </div>
            <div class="col-12">
              <label for="description" class="form-label">Descrição</label>
              <input
                type="text"
                v-model="subcategory.description"
                class="form-control"
                id="description"
                placeholder="Descrição"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('close')"
          >
            Cancelar
          </button>
          <button type="button" @click="emitSubmit" class="btn btn-primary">
            Criar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["parentCategory", "subcategory"]);
// let parentCategory = useState("parentCategory", () => ({}));
const subcategory = useState("subcategory", () => ({}));
const emit = defineEmits(["submit", "close"]);

function emitSubmit() {
  emit("submit");
}
</script>
