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
import { usePermissionsStore } from "~/stores/permissions";
import { storeToRefs } from "#imports";

const roleStore = useRolesStore();
const permissionStore = usePermissionsStore();
const { $blockui } = useNuxtApp();
const route = useRoute();
const id = route.params.id;

let role = useState("role", () => ({}));
let { permissions } = storeToRefs(permissionStore);

onMounted(async () => {
  $blockui().start();
  cleanData();

  role.value = await roleStore.findRole(id);
  await permissionStore.find("", 10);
  $blockui().stop();
});

function cleanData() {
  role.value = {};
}

async function searchPermissions(e) {
  await permissionStore.find(e, 10);
}

async function submit(e) {
  e.preventDefault();
  const { value } = role;

  $blockui().start();
  try {
    const permissions = value.permissions.map((permission) => permission.id);
    const { name, description } = value;
    await roleStore.update(id, { name, description, permissions });

    navigateTo("/roles");
    cleanData();
  } catch (err) {
    let message = err.data?.message || "Não foi possivel editar cargo!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  } finally {
    $blockui().stop();
  }
}
</script>
