<template>
  <BudgetsForm
    v-model:budget="budget"
    :categories="categories"
    :validator="$v"
    :departments="departments"
    @onSearchCategories="searchCategories"
    @onSearchDepartments="searchDepartments"
    @submit="submit"
  />
</template>

<script setup>
import Swal from "sweetalert2";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { useBudgetsStore } from "@/stores/budgets";
import { useCategoriesStore } from "@/stores/categories";
import { useDepartmentsStore } from "@/stores/departments";
import { storeToRefs } from "pinia";

const { $blockui, $onlyNumbers, $numbersToCurrency } = useNuxtApp();
const categoryStore = useCategoriesStore();
const departmentStore = useDepartmentsStore();
const budgetStore = useBudgetsStore();

const { categories } = storeToRefs(categoryStore);
const { departments } = storeToRefs(departmentStore);
const budget = useState("budget", () => ({}));
const budgetOverflow = useState("budgetOverflow", () => false);

const mustBeObject = (value) => value.id;
const mustBeNumeric = (value) => Number($onlyNumbers(value));
const mustBeRequired = (value) => !!value;

const rules = computed(() => {
  return {
    department: {
      mustBeObject: helpers.withMessage("Campo obrigatório!", mustBeObject),
    },
    value: {
      mustBeRequired: helpers.withMessage("Campo obrigatório!", mustBeRequired),
      mustBeNumeric: helpers.withMessage("Campo obrigatório!", mustBeNumeric),
    },
    month: {
      mustBeRequired: helpers.withMessage("Campo obrigatório!", mustBeRequired),
    },
  };
});

let $v = useVuelidate(rules, budget);

onMounted(async () => {
  $blockui().start();
  budget.value = {};
  await searchCategories("");
  await searchDepartments("");
  $blockui().stop();
});

async function searchDepartments(e = "") {
  await departmentStore.findByName(e, 10);
}

async function searchCategories(e = "") {
  await categoryStore.findCategoryRootByName(e, 10);
}

function convertToNumber(value) {
  const numbers = $onlyNumbers(value);
  return $numbersToCurrency(numbers, 2);
}

function mapperCategoryValueToConvert(categories) {
  return categories.map((category) => {
    category.value = convertToNumber(category.value);
    category.subcategories = category.subcategories.map((subcategory) => {
      subcategory.value = convertToNumber(subcategory.value);
      return subcategory;
    });
    return category;
  });
}

function flatCategories(categories) {
  let result = [];
  categories?.forEach((category) => {
    result.push(category);
    category.subcategories.forEach((subcategory) => {
      result.push(subcategory);
    });
  });

  return result;
}

function DTO(value) {
  return {
    month: value.month,
    value: convertToNumber(value.value),
    department_id: value.department?.id || null,
    categories: flatCategories(mapperCategoryValueToConvert(value.categories)),
  };
}

async function submit(e) {
  e.preventDefault();
  if (budgetOverflow.value) {
    return Swal.fire({
      title: "Error!",
      text:
        "Orçamento distriuido é superior ao orçamento destinado ao departamento. Favor revisar",
      icon: "error",
    });
  }

  if (await $v.value.$validate()) {
    try {
      $blockui().start();
      const paylod = DTO(budget.value);

      await budgetStore.create(paylod);

      navigateTo("/budgets");
      Swal.fire({
        title: "Sucesso!",
        text: "Orçamento criado com sucesso",
        icon: "success",
      });
    } catch (err) {
      const message =
        err.data?.message ||
        err.message ||
        "Não foi possivel criar o orçamento!";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    } finally {
      $blockui().stop();
    }
  } else {
    Swal.fire({
      title: "Error!",
      text: "Alguns campos necessitam de revisão!",
      icon: "error",
    });
  }
}
</script>

<style lang="scss" scoped></style>
