import Https from "~/server/Https";

class RoleApi extends Https {
  constructor() {
    super();
  }

  public async findByName(name: string, perPage: number): Promise<object[]> {
    return await this.$fetch("/v1/roles/find", {
      method: "GET",
      params: { name, perPage },
    });
  }

  public async rolesPaginate(page: number, perPage: number): Promise<object> {
    return await this.$fetch("/v1/roles/paginate", {
      method: "GET",
      params: { page, perPage },
    });
  }

  public async find(id: number): Promise<object> {
    return await this.$fetch(`/v1/roles/${id}`, { method: "GET" });
  }

  public async create(role: object): Promise<object> {
    return await this.$fetch("/v1/roles", { method: "POST", body: role });
  }

  public async update(id: number, role: object): Promise<object> {
    return await this.$fetch(`/v1/roles/${id}`, {
      method: "PATCH",
      body: role,
    });
  }

  public async destroy(id: number): Promise<void> {
    return this.$fetch(`/v1/roles/${id}`, { method: "DELETE" });
  }
}

export default RoleApi;
