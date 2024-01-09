<template>
  <VouchersForm
    v-model:voucher="voucher"
    :categories="categories"
    :departments="departments"
    :users="users"
    :requiredManager="requiredManager"
    @onSearchDepartment="searchDepartment"
    @onSearchCategory="searchCategory"
    @onSearchUsers="searchUser"
    @submit="submit"
  />
</template>

<script setup>
import Swal from "sweetalert2";
import { useDepartmentsStore } from "../../stores/departments";
import { useCategoriesStore } from "../../stores/categories";
import { useBudgetsStore } from "../../stores/budgets";
import { useVouchersStore } from "../../stores/vouchers";
import { useUsersStore } from "../../stores/users";
import { storeToRefs } from "pinia";

const usersStore = useUsersStore();
const departmentStore = useDepartmentsStore();
const voucherStore = useVouchersStore();
const categoryStore = useCategoriesStore();
const budgetStore = useBudgetsStore();

const { departments } = storeToRefs(departmentStore);
const { profile, users } = storeToRefs(usersStore);
const { $blockui, $convertToNumber, $dateTime } = useNuxtApp();
const { categories } = storeToRefs(categoryStore);
const voucher = useState("voucher", () => ({}));
const requiredManager = useState("requierdManager", () => false);

onMounted(async () => {
  voucher.value = {};
  await searchCategory("");
  await searchDepartment("");
  await searchUser("");
});

watch(
  () => voucher.value.department,
  async () => {
    categories.value = [];
    voucher.value.category = {};
    if (voucher.value.date) {
      await searchCategory();
    }
  }
);
watch(
  () => voucher.value.date,
  async () => {
    voucher.value.category = {};
    categories.value = [];
    if (voucher.value.department?.id) {
      await searchCategory();
    }
  }
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
    user_id: profile.id,
    approval_requests: value.user_approvals?.map((request) => request.id) || [],
  };
}

async function submit(e) {
  try {
    e.preventDefault();
    $blockui().start();
    await voucherStore.create(DTO(voucher.value));

    navigateTo("/vouchers");
    Swal.fire({
      title: "Sucesso!",
      text: "Orçamento criado com sucesso",
      icon: "success",
    });
  } catch (err) {
    let errData = err.data;
    let message =
      err.data?.message || err.message || "Não foi possivel solicitar o vale!";
    if (errData.code == "E_VALUE_VOUCHER_INVALID") {
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
