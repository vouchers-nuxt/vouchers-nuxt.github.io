import Https from "~/server/Https";

export default class BudgetApi extends Https {
  constructor() {
    super();
  }

  async paginate(page: number, perPage: number): Promise<object> {
    return await this.$fetch("/v1/budgets/paginate", {
      method: "GET",
      params: { page, perPage },
    });
  }

  public async findCategoryByDepartment({
    department_id,
    name,
    month,
    perPage,
  }: any): Promise<Object[]> {
    return await this.$fetch(`/v1/budgets/categories`, {
      params: { department_id, name, month, perPage },
      method: "GET",
    });
  }

  async find(id: number) {
    return await this.$fetch(`/v1/budgets/${id}`, {
      method: "GET",
    });
  }

  async create(budget: object): Promise<object> {
    return await this.$fetch("/v1/budgets", {
      method: "POST",
      body: budget,
    });
  }

  async update(id: number, budget: object): Promise<object> {
    return await this.$fetch(`/v1/budgets/${id}`, {
      method: "PATCH",
      body: budget,
    });
  }

  async destroy(id: number): Promise<object> {
    return await this.$fetch(`/v1/budgets/${id}`, {
      method: "DELETE",
    });
  }
}
