<template>
  <DepartmentsForm
    v-model:department="department"
    :users="users"
    @onSearchUsers="searchUsers"
    @submit="submit"
  />
</template>

<script setup>
import Swal from "sweetalert2";
const { $blockui } = useNuxtApp();
import { useUsersStore } from "@/stores/users";
import { useDepartmentsStore } from "@/stores/departments";
import { storeToRefs } from "pinia";

const departmentStore = useDepartmentsStore();
const userStore = useUsersStore();
const { users } = storeToRefs(userStore);
const department = useState("department", () => ({}));

function cleanData() {
  department.value = {};
}

onMounted(async () => {
  $blockui().start();
  cleanData();
  await userStore.findUsers("", 10);
  $blockui().stop();
});

async function searchUsers(e) {
  await userStore.findUsers(e, 10);
}

async function submit(e) {
  e.preventDefault();
  const { value } = department;
  try {
    value.manager_id = value.manager.id;
    $blockui().start();
    const { name, description, manager_id } = value;
    await departmentStore.create({ name, description, manager_id });
    Swal.fire({
      title: "Oba!",
      text: "Departamento criado com sucesso!",
      icon: "success",
    });
    navigateTo("/departments");

    cleanData();
  } catch (err) {
    let message = err.data?.message || "Não foi possivel criar departamento!";
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
