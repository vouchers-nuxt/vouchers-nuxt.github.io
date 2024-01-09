<template>
  <div class="d-flex">
    <div class="d-none d-sm-block col-sm-12 col-md-5">
      <div class="pt-2">
        Mostrando página
        {{ currentPage || 0 }} de {{ lastPage || 0 }} em um total de
        {{ total || 0 }} registros
      </div>
    </div>
    <div class="col-sm-12 col-md-7 d-flex justify-content-end">
      <nav aria-label="Page navigation example">
        <ul class="pagination w-100">
          <li class="page-item">
            <a href="#" class="page-link" @click="$emit('preview')">Anterior</a>
          </li>
          <li class="page-item">
            <a href="#" class="page-link" @click="$emit('next')">Próximo</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
let page = useState("page", () => 1);

onBeforeMount(() => {
  page.value = 1;
});

defineProps({
  currentPage: Number,
  lastPage: Number,
  total: Number,
});

defineEmits(["next", "preview"]);
</script>
