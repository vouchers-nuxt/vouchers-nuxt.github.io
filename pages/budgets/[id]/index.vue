<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              Orçamento #{{ budget.id }}
            </h6>
          </div>
          <div class="card-body">
            <p>Mês: {{ $dateTime(budget.month, "LLLL,  yyyy") || "N/A" }}</p>
            <p>Valor: R${{ $mask(budget.value) || "N/A" }}</p>
            <p>Departamento: {{ budget.department?.name || "N/A" }}</p>

            <div class="row">
              <div class="col-12 col-sm-12">
                <div class="table-responsive" style="min-height: 300px">
                  <table
                    id="tree"
                    class="table table-sm table-bordered table-striped mb-0"
                  >
                    <thead>
                      <tr>
                        <td>*</td>
                        <td>ID</td>
                        <td>Nome</td>
                        <td>Descrição</td>
                        <td>Orçamento</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        :class="treeClass(item)"
                        v-for="item in categoriesWithSubcategories"
                      >
                        <td style="width: 50px"></td>
                        <td style="vertical-align: middle">{{ item.id }}</td>
                        <td style="vertical-align: middle">
                          {{ item.name }}
                        </td>
                        <td style="vertical-align: middle">
                          {{ item.description }}
                        </td>
                        <td style="vertical-align: middle">
                          <input
                            type="text"
                            v-mask
                            disabled
                            v-model="item.value"
                            placeholder="Orçamento"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>total: {{ totalBudgetDistributed }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBudgetsStore } from "@/stores/budgets";

const { $blockui, $mask, $onlyNumbers, $dateTime } = useNuxtApp();
const budgetsStore = useBudgetsStore();
const route = useRoute();

const id = route.params.id;
const budget = useState("budget", () => ({}));

const categoriesWithSubcategories = computed(() => {
  let result = [];
  budget?.value?.categories?.forEach((category) => {
    result.push(category);
    category?.subcategories?.forEach((subcategory) => {
      result.push(subcategory);
    });
  });

  if (result.length) {
    setTimeout(() => {
      $("#tree").treegrid();
    }, 200);
  }
  return result;
});

const totalBudgetDistributed = computed(() => {
  let value = 0;
  for (let category of budget?.value.categories || []) {
    if (!category.subcategories?.length) value += $onlyNumbers(category.value);
    value += category.subcategories.reduce(
      (acc, next) => (acc += $onlyNumbers(next.value) || 0),
      0
    );
  }

  value = $mask(value);

  return value;
});

onMounted(async () => {
  $blockui().start();

  budget.value = await budgetsStore.find(id);

  $blockui().stop();
});

function treeClass(item) {
  const className = `treegrid-${item.id} ${
    item.parent_category_id ? `treegrid-parent-${item.parent_category_id}` : ""
  }`;

  return className;
}
</script>
