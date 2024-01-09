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
const route = useRoute();
const id = route.params.id;
const department = useState("department", () => ({}));
let { users } = storeToRefs(userStore);

function cleanData() {
  department.value = {};
}

onMounted(async () => {
  $blockui().start();
  cleanData();

  department.value = await departmentStore.find(id);
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
    const { name, description, manager_id } = value;
    $blockui().start();
    await departmentStore.update(id, { name, description, manager_id });
    Swal.fire({
      title: "Oba!",
      text: "Departamento atualizado com sucesso!",
      icon: "success",
    });
    navigateTo("/departments");

    cleanData();
  } catch (err) {
    let message =
      err.data?.message || "Não foi possivel atualizar departamento!";
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
