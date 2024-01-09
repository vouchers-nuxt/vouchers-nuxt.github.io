<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              {{ !budget?.id ? "Criar" : "Editar" }} orçamento
            </h6>
          </div>
          <form @submit="(e) => $emit('submit', e)">
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-sm-4 mb-3">
                  <label for="name" class="form-label">Mês</label>
                  <input
                    type="month"
                    v-model="budget.month"
                    :class="
                      `form-control ${
                        isInvalid(validator?.month) ? 'is-invalid' : ''
                      }`
                    "
                    id="name"
                    placeholder="Mês"
                  />
                  <div
                    :class="
                      `invalid-feedback ${
                        isInvalid(validator?.month) ? 'd-block' : ''
                      }`
                    "
                  >
                    {{ validator?.month?.$errors[0]?.$message }}
                  </div>
                </div>
                <div class="col-12 col-sm-4 mb-3">
                  <label for="budget" class="form-label">Orçamento</label>
                  <input
                    type="text"
                    v-mask
                    v-model="budget.value"
                    :class="
                      `form-control ${
                        isInvalid(validator?.value) ? 'is-invalid' : ''
                      }`
                    "
                    id="budget"
                    placeholder="Orçamento"
                  />

                  <div
                    :class="
                      `invalid-feedback ${
                        isInvalid(validator?.value) ? 'd-block' : ''
                      }`
                    "
                  >
                    {{ validator?.value?.$errors[0]?.$message }}
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <label for="department" class="form-label"
                    >Departamento</label
                  >
                  <VueMultiselect
                    placeholder="Digite para buscar departamentos"
                    noOptions="Sem registros"
                    track-by="name"
                    label="name"
                    required
                    v-model="budget.department"
                    :options="departments"
                    @search-change="
                      (value) => $emit('onSearchDepartments', value)
                    "
                    ><template v-slot:noOptions
                      >Sem registros</template
                    ></VueMultiselect
                  >
                  <div
                    id="department"
                    :class="
                      `invalid-feedback ${
                        isInvalid(validator?.department) ? 'd-block' : ''
                      }`
                    "
                  >
                    {{ validator?.department?.$errors[0]?.$message }}
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-12 col-sm-4">
                  <label for="description" class="form-label"
                    >Selecione as categorias</label
                  >
                  <VueMultiselect
                    placeholder="Digite para buscar categorias"
                    noOptions="Sem registros"
                    track-by="name"
                    label="name"
                    :multiple="true"
                    v-model="budget.categories"
                    :options="categories"
                    @search-change="
                      (value) => $emit('onSearchCategories', value)
                    "
                    ><template v-slot:noOptions
                      >Sem registros</template
                    ></VueMultiselect
                  >
                </div>
                <div class="col-12 col-sm-12 mt-3">
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
                              v-model="item.value"
                              @input="inputBudget(item)"
                              :disabled="disabledBudgetField(item)"
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
                    <small class="text-danger" v-if="budgetOverflow"
                      >Orçamento distriuido é superior ao orçamento destinado ao
                      departamento.</small
                    >
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div class="card-footer">
              <button class="btn btn-info" type="submit">
                {{ budget.id ? "Atualizar" : "Salvar" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";

const { $onlyNumbers, $mask } = useNuxtApp();

const props = defineProps({
  budget: Object,
  departments: Array,
  categories: Array,
  validator: Object,
});

defineEmits(["submit", "onSearchCategories", "onSearchDepartments"]);

const budgetOverflow = useState("budgetOverflow", () => false);

const categoriesWithSubcategories = computed(() => {
  let result = [];
  props.budget?.categories?.forEach((category) => {
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
  for (let category of props.budget?.categories || []) {
    if (!category.subcategories?.length) value += $onlyNumbers(category.value);
    value += category.subcategories.reduce(
      (acc, next) => (acc += $onlyNumbers(next.value) || 0),
      0
    );
  }

  value = $mask(value);
  if ($onlyNumbers(value) > $onlyNumbers(props.budget.value)) {
    budgetOverflow.value = true;
  } else {
    budgetOverflow.value = false;
  }
  return value;
});

function isInvalid(field) {
  return field?.$dirty && field?.$invalid;
}

function disabledBudgetField(item) {
  const category = props.categories?.find((category) => category.id == item.id);
  if (category && category.subcategories?.length) {
    return true;
  }
  return false;
}

function inputBudget(item) {
  const category = props.budget?.categories?.find(
    (category) => category.id == item.parent_category_id
  );
  if (category) {
    if (!category.value) category.value = 0;
    let total = 0;
    category.subcategories.forEach((subcategory) => {
      total += $onlyNumbers(subcategory.value);
      subcategory.value = $mask($onlyNumbers(subcategory.value));
    });
    category.value = $mask(total);
  }
}

function treeClass(item) {
  const className = `treegrid-${item.id} ${
    item.parent_category_id ? `treegrid-parent-${item.parent_category_id}` : ""
  }`;

  return className;
}
</script>

<style lang="scss" scoped></style>
