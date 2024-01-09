<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              Departamento #{{ department?.id || 0 }}
            </h6>
          </div>
          <div class="card-body">
            <p>Nome: {{ department.name || "N/A" }}</p>
            <p>Descrição: {{ department.description || "N/A" }}</p>
            <p>Gestor: {{ department.manager?.name || "N/A" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { useDepartmentsStore } from "@/stores/departments";

const departmentStore = useDepartmentsStore();
const { $blockui } = useNuxtApp();
const department = useState("department", () => ({}));
const router = useRoute();

const id = router.params.id;
onMounted(async () => {
  try {
    $blockui().start();
    department.value = await departmentStore.find(id);

    $blockui().stop();
  } catch (err) {
    let message =
      err.data?.message || "Não foi possivel carregar departamento!";
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }
});
</script>
