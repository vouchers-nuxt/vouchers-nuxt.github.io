import Https from "~/server/Https";

class PermissionApi extends Https {
  constructor() {
    super();
  }

  public async findByName(name: string, perPage: number): Promise<object[]> {
    return await this.$fetch("/v1/permissions/find", {
      method: "GET",
      params: { name, perPage },
    });
  }

  public async paginate(page: number, perPage: number): Promise<object> {
    return await this.$fetch("/v1/permissions/paginate", {
      method: "GET",
      params: { page, perPage },
    });
  }
}

export default PermissionApi;
