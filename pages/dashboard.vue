<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Início</h1>
    </div>

    <!-- <PanelManager v-if="$can('smasnagers')" /> -->
    <PanelEmployee />
  </div>
</template>

<script setup>
import { nextTick } from "vue";
definePageMeta({
  middleware: "auth",
});
</script>
