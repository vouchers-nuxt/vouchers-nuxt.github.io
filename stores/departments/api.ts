import Https from "~/server/Https";

export default class DepartmentApi extends Https {
  constructor() {
    super();
  }

  public async paginate(page: number, perPage: number): Promise<object> {
    return await this.$fetch("/v1/departments/paginate", {
      method: "GET",
      params: { page, perPage },
    });
  }

  public async findDepartmentUserByName(
    name: string,
    perPage: number
  ): Promise<object[]> {
    return await this.$fetch("/v1/departments/user/find", {
      method: "GET",
      params: { name, perPage },
    });
  }

  public async findByName(name: string, perPage: number): Promise<object[]> {
    return await this.$fetch("/v1/departments/find", {
      method: "GET",
      params: { name, perPage },
    });
  }

  public async create(department: object): Promise<object> {
    return await this.$fetch("/v1/departments", {
      method: "POST",
      body: department,
    });
  }

  public async find(id: number): Promise<object> {
    return await this.$fetch(`/v1/departments/${id}`, {
      method: "GET",
    });
  }

  public async update(id: number, department: object): Promise<object> {
    return await this.$fetch(`/v1/departments/${id}`, {
      method: "PATCH",
      body: department,
    });
  }

  public async destroy(id: number): Promise<void> {
    return await this.$fetch(`/v1/departments/${id}`, {
      method: "DELETE",
    });
  }
}
