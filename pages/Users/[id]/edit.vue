<template>
  <UsersForm
    @submit="submit"
    v-model:user="user"
    :roles="roles"
    :passwordError="passwordError"
    :passwordConfirmationError="passwordConfirmationError"
    :permissions="permissions"
    :departments="departments"
    @onSearchRoles="searchRoles"
    @onSearchPermissions="searchPermissions"
    @onSearchDepartments="searchDepartments"
  />
</template>

<script setup>
import Swal from "sweetalert2";
const { $blockui } = useNuxtApp();
import { useUsersStore } from "@/stores/users";
import { useRolesStore } from "@/stores/roles";
import { usePermissionsStore } from "~/stores/permissions";
import { useDepartmentsStore } from "~/stores/departments";
import { storeToRefs } from "pinia";

const departmentStore = useDepartmentsStore();
const permissionStore = usePermissionsStore();
const userStore = useUsersStore();
const roleStore = useRolesStore();
const route = useRoute();

const id = route.params.id;

let user = useState("user", () => ({}));
let { permissions } = storeToRefs(permissionStore);
let { departments } = storeToRefs(departmentStore);
let { roles } = storeToRefs(roleStore);

let passwordConfirmationError = useState(
  "passwordConfirmationError ",
  () => ""
);
let passwordError = useState("passwordError ", () => "");

onMounted(async () => {
  $blockui().start();
  cleanData();

  user.value = await userStore.getUser(id);
  await roleStore.findRoles("", 10);
  await departmentStore.findByName("", 10);
  await permissionStore.find("", 10);
  $blockui().stop();
});

async function searchRoles(e) {
  await roleStore.findRoles(e, 10);
}

async function searchDepartments(e) {
  await departmentStore.findByName(e, 10);
}

async function searchPermissions(e) {
  await permissionStore.find(e, 10);
}

function cleanData() {
  user.value = {};
}

function DTO(value) {
  delete value.depeted_at;
  delete value.created_at;
  delete value.updated_at;
  delete value.id;
  return value;
}

async function submit(e) {
  e.preventDefault();
  const { value } = user;

  if (value.password != value.password_confirmation) {
    Swal.fire("Oops!", "Senhas não Coincidem!", "error");
    $("#password_confirmation").addClass("is-invalid");
    $("#password").addClass("is-invalid");
    passwordConfirmationError.value = "Senhas não Coincidem";
    passwordError.value = "Senhas não Coincidem";

    return;
  }

  $blockui().start();
  try {
    value.roles = value.roles.map((role) => role.id);
    value.permissions = value.permissions.map((permission) => permission.id);
    value.departments = value.departments.map((department) => department.id);
    await userStore.updateUser(id, DTO(value));

    navigateTo("/users");
  } catch (err) {
    let message = err.data?.message || "Não foi possivel editar usuário!";
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
