<template>
  <div>
    <div id="wrapper" v-if="$route.name != 'signin'">
      <!-- Sidebar -->
      <LayoutSidebar />
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <LayoutNavbar />
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <NuxtPage />

          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <LayoutFooter />
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
      <!-- Scroll to Top Button-->
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </div>
    <div v-else>
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
onMounted(() => {
  document.body.id = "page-top";
  let script = document.createElement("script");

  // Por algum motivo misterioso o dropdown do menu so funciona se importar esses aquivos aqui
  script.src = "/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
  document.body.appendChild(script);

  script = document.createElement("script");
  script.src = "/assets/js/sb-admin-2.min.js";
  document.body.appendChild(script);

  $("body").tooltip({
    selector: '[data-bs-toggle="tooltip"]',
  });
});
</script>

<style lang="scss">
@import "sweetalert2/src/sweetalert2.scss";
@import "vue-multiselect/dist/vue-multiselect.css";

.treegrid-expander-expanded,
.treegrid-expander-collapsed {
  background-repeat: no-repeat;
  background-position: center;
}
.inline-permissions {
  display: -webkit-inline-box;
  flex-wrap: wrap;
}
</style>
