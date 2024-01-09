import Https from "~/server/Https";

export default class CategoryApi extends Https {
  constructor() {
    super();
  }

  public async paginate(page: number, perPage: number): Promise<object> {
    return await this.$fetch("/v1/categories/paginate", {
      method: "GET",
      params: { page, perPage },
    });
  }

  public async find(id: number): Promise<object> {
    return this.$fetch(`/v1/categories/${id}`, {
      method: "GET",
    });
  }

  public async findCategoryRootByName(
    name: string,
    perPage: number
  ): Promise<object[]> {
    return await this.$fetch("/v1/categories/find", {
      method: "GET",
      params: { name, perPage, root: true },
    });
  }

  public async create(category: object): Promise<void> {
    return await this.$fetch("/v1/categories", {
      method: "POST",
      body: category,
    });
  }

  public async update(id: number, category: object): Promise<void> {
    return await this.$fetch(`/v1/categories/${id}`, {
      method: "PATCH",
      body: category,
    });
  }

  public async destroy(id: number): Promise<void> {
    return await this.$fetch(`/v1/categories/${id}`, {
      method: "DELETE",
    });
  }
}
