<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              Usuário #{{ user.id }}
            </h6>
          </div>
          <div class="card-body">
            <p>Nome: {{ user.name || "N/A" }}</p>
            <p>Usuário: {{ user.username || "N/A" }}</p>
            <p>Email: {{ user.email || "N/A" }}</p>
            <p class="d-inline-flex">
              Cargos:
              <div v-for="(item, index) in user.roles" >
                  <span
                    class="badge bg-secondary"
                    >{{ item.name }}</span
                  >{{ index < user.roles.length -1 ? ',' : '' }}
              </div>
            </p>
            <br>
            <div class="form-group">
              <label for="">Permissões:</label>
              <div class="inline-permissions">
                <div v-for="(item, index) in user.permissions">
                  <span class="badge bg-secondary">{{ item.name }}</span
                  >{{ index < user.permissions.length - 1 ? "," : "" }}
                </div>
              </div>
            </div>
            <br>
            <p class="d-inline-flex">
              Departamentos:
              <div v-for="(item, index) in user.departments" >
                  <span
                    class="badge bg-secondary"
                    >{{ item.name }}</span
                  >{{ index < user.departments.length -1 ? ',' : '' }}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
const { $blockui } = useNuxtApp();
import { useUsersStore } from "@/stores/users";

const userStore = useUsersStore();
const user = useState("user", () => ({}));
const router = useRoute();

const id = router.params.id;
onMounted(async () => {
  try {
    $blockui().start();
    user.value = await userStore.getUser(id);

    $blockui().stop();
  } catch (err) {
    let message = err.data?.message || "Não foi possivel carregar usuário!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }
});
</script>
