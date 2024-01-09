<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="index.html"
    >
      <div class="sidebar-brand-icon">VedaPack</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item ">
      <NuxtLink :class="`nav-link`" to="/dashboard">
        <i class="bi bi-speedometer2"></i>
        <span>Dashboard</span></NuxtLink
      >
    </li>

    <!-- Divider -->
    <!-- <hr class="sidebar-divider" /> -->

    <!-- Heading -->
    <!-- <div class="sidebar-heading">Interface</div> -->

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item" v-if="$can('read_users').value">
      <a
        :class="`nav-link collapsed`"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="bi bi-person-circle"></i>
        <span>Usuários</span>
      </a>
      <div
        id="collapseTwo"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Menu Usuários:</h6>
          <NuxtLink class="collapse-item" to="/users">Usuários</NuxtLink>
          <NuxtLink class="collapse-item" to="/roles">Cargos</NuxtLink>
          <NuxtLink class="collapse-item" to="/permissions"
            >Permissões</NuxtLink
          >
        </div>
      </div>
    </li>

    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item" v-if="$can('read_departments').value">
      <NuxtLink class="nav-link" to="/departments">
        <i class="bi bi-building-fill-gear"></i>
        <span>Departamentos</span></NuxtLink
      >
    </li>
    <li class="nav-item" v-if="$can('read_categories').value">
      <NuxtLink class="nav-link" to="/categories">
        <i class="bi bi-stack"></i>
        <span>Categorias</span></NuxtLink
      >
    </li>
    <li class="nav-item" v-if="$can('read_budgets').value">
      <NuxtLink class="nav-link" to="/budgets">
        <i class="bi bi-wallet"></i>
        <span>Orçamento</span></NuxtLink
      >
    </li>
    <li
      class="nav-item"
      v-if="
        $can('read_vouchers').value || $can('read_approvals_vouchers').value
      "
    >
      <a
        :class="`nav-link collapsed`"
        href="#"
        data-toggle="collapse"
        data-target="#collapseThree"
        aria-expanded="true"
        aria-controls="collapseThree"
      >
        <i class="bi bi-ticket-detailed"></i>
        <span>Vales</span>
      </a>
      <div
        id="collapseThree"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <NuxtLink
            v-if="$can('read_approval_requests').value"
            class="collapse-item"
            to="/approval-requests"
            >Pendêntes</NuxtLink
          >
          <NuxtLink
            v-if="$can('read_vouchers').value"
            class="collapse-item"
            to="/vouchers"
            >Vales</NuxtLink
          >
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
</template>

<script setup>
onMounted(() => {
  $(".collapse-item").each(function(e) {
    $(this).on("click", function() {
      const parentId = $(this)
        .parent()
        .parent()
        .attr("id");
      $(`[data-target="#${parentId}"]`).click();
    });
  });
});
</script>

<style lang="scss" scoped></style>
