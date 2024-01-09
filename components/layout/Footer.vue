<template>
  <footer class="sticky-footer bg-white">
    <div class="container my-auto">
      <div class="copyright text-center my-auto">
        <span>Copyright &copy; Ks Gestão {{ year }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { $instanceLuxon } = useNuxtApp();
const year = computed(() => {
  return $instanceLuxon.fromObject(new Date()).toFormat("yyyy");
});
</script>

<style lang="scss" scoped></style>
