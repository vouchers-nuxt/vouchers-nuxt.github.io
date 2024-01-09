<template>
  <VouchersForm
    v-model:voucher="voucher"
    :categories="categories"
    :departments="departments"
    :requiredManager="requiredManager"
    :users="users"
    @onSearchDepartment="searchDepartment"
    @onSearchCategory="searchCategory"
    @submit="submit"
  />
</template>

<script setup>
import Swal from "sweetalert2";
import { useDepartmentsStore } from "../../../stores/departments";
import { useCategoriesStore } from "../../../stores/categories";
import { useBudgetsStore } from "../../../stores/budgets";
import { useUsersStore } from "../../../stores/users";
import { useVouchersStore } from "../../../stores/vouchers";
import { storeToRefs } from "pinia";

const usersStore = useUsersStore();
const departmentStore = useDepartmentsStore();
const voucherStore = useVouchersStore();
const categoryStore = useCategoriesStore();
const budgetStore = useBudgetsStore();
const route = useRoute();

const { departments } = storeToRefs(departmentStore);
const { profile, users } = storeToRefs(usersStore);
const { $blockui, $convertToNumber, $dateTime } = useNuxtApp();
const { categories } = storeToRefs(categoryStore);
const voucher = useState("voucher", () => ({}));
const requiredManager = useState("requierdManager", () => false);
const id = route.params.id;

onMounted(async () => {
  try {
    $blockui().start();

    const value = await voucherStore.find(id);
    const category = value.category;
    voucher.value = value;
    await searchCategory("");
    await searchDepartment("");
    await searchUser("");
    voucher.value.category = category;
  } catch (err) {
    let message =
      err.data?.message || err.message || "Não foi possivel carregar o vale!";

    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  } finally {
    $blockui().stop();
  }
});

watch(
  () => voucher.value.department,
  async () => {
    categories.value = [];
    if (voucher.value.date) {
      console.log("rt");
      voucher.value.category = {};
      await searchCategory();
    }
  },
  { deep: true }
);
watch(
  () => voucher.value.date,
  async () => {
    categories.value = [];
    if (voucher.value.department?.id) {
      console.log("rtd");
      voucher.value.category = {};
      await searchCategory();
    }
  },
  { deep: true }
);

async function searchDepartment(name = "") {
  await departmentStore.findDepartmentUserByName(name, 10);
}

async function searchUser(name = "") {
  await usersStore.findManager(name, 10);
}

async function searchCategory(name = "") {
  const department_id = voucher.value.department?.id;
  const month = $dateTime(voucher.value.date, "y-MM");
  await budgetStore.findCategoryByDepartment({
    month,
    department_id,
    name,
    perPage: 10,
  });
}

function DTO(value) {
  return {
    value: $convertToNumber(value.value),
    date: value.date,
    department_id: value.department?.id || null,
    category_id: value.category?.id || null,
    user_id: profile.value.id,
    approval_requests: value.user_approvals?.map((request) => request.id),
  };
}

async function submit(e) {
  try {
    e.preventDefault();
    $blockui().start();
    await voucherStore.update(id, DTO(voucher.value));

    navigateTo("/vouchers");
    Swal.fire({
      title: "Sucesso!",
      text: "Orçamento atualizado com sucesso",
      icon: "success",
    });
  } catch (err) {
    let errData = err.data;
    let message =
      err.data?.message || err.message || "Não foi possivel solicitar o vale!";
    if (errData?.code == "E_VALUE_VOUCHER_INVALID") {
      requiredManager.value = true;
    }
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
