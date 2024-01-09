<template>
  <RolesForm
    @submit="submit"
    v-model:role="role"
    :permissions="permissions"
    @onSearchPermissions="searchPermissions"
  />
</template>

<script setup>
import Swal from "sweetalert2";
import { useRolesStore } from "~/stores/roles";
import { usePermissionsStore } from "@/stores/permissions";
import { storeToRefs } from "pinia";

const permissionStore = usePermissionsStore();
const roleStore = useRolesStore();
const { $blockui } = useNuxtApp();

let role = useState("role", () => ({}));
let { permissions } = storeToRefs(permissionStore);

onMounted(async () => {
  $blockui().start();
  cleanData();
  await permissionStore.find("", 10);
  $blockui().stop();
});

function cleanData() {
  role.value = {};
}

async function submit(e) {
  e.preventDefault();
  try {
    $blockui().start();
    role.value.permissions = role.value.permissions?.map(
      (permission) => permission.id
    );
    await roleStore.create(role.value);

    navigateTo("/roles");
    Swal.fire({
      title: "Sucesso!",
      text: "Orçamento criado com sucesso",
      icon: "success",
    });
    cleanData();
  } catch (err) {
    let message = err.data?.message || "Não foi possivel criar cargo!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  } finally {
    $blockui().stop();
  }
}

async function searchPermissions(e) {
  await permissionStore.find(e, 10);
}
</script>
