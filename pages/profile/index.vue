<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Perfil</h1>
    </div>

    <hr />

    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header py-3 d-flex flex-row align-items-center ">
            <h6 class="mb-0 font-weight-bold">Usuário: {{ profile.name }}</h6>
          </div>
          <div class="card-body">
            <p>Nome: {{ profile.name || "N/A" }}</p>
            <p>Usuário: {{ profile.username || "N/A" }}</p>
            <p>Email: {{ profile.email || "N/A" }}</p>
            <p class="d-inline-flex">
              Cargos:
              <div v-for="(item, index) in profile.roles" >
                  <span
                    class="badge bg-secondary"
                    >{{ item.name }}</span
                  >{{ index < profile.roles.length -1 ? ',' : '' }}
              </div>
            </p>
            <br>
            <div class="form-group">
              <label for="">Permissões:</label>
              <div class="inline-permissions">
                <div v-for="(item, index) in profile.permissions" >
                    <span
                      class="badge bg-secondary"
                      >{{ item.name }}</span
                    >{{ index < profile.permissions.length -1 ? ',' : '' }}
                </div>

              </div>
            </div>
            <p class="d-inline-flex">
              Departamentos:
              <div v-for="(item, index) in profile.departments" >
                  <span
                    class="badge bg-secondary"
                    >{{ item.name }}</span
                  >{{ index < profile.departments.length -1 ? ',' : '' }}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUsersStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const userStore = useUsersStore();
const { profile } = storeToRefs(userStore);

const {} = onMounted(() => {});
</script>
