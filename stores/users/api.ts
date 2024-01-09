import Https from "~/server/Https";

class UserApi extends Https {
  constructor() {
    super();
  }

  public async signin(user: any) {
    return await this.$fetch("/v1/signin", { method: "post", body: user });
  }

  public async find(id: number) {
    return await this.$fetch(`/v1/users/${id}`, { method: "GET" });
  }

  public async profile() {
    return await this.$fetch("/v1/users/profile");
  }

  public async findManager(name: string, perPage: number): Promise<Object[]> {
    return await this.$fetch("/v1/users/managers", {
      method: "GET",
      params: { name, perPage },
    });
  }

  public async userPaginate(page: number, perPage: number) {
    return await this.$fetch("/v1/users/paginate", {
      query: {
        page,
        perPage,
      },
    });
  }

  public async create(user: object) {
    return await this.$fetch("/v1/users", { method: "POST", body: user });
  }

  public async update(id: number, user: object) {
    return await this.$fetch(`/v1/users/${id}`, {
      method: "PATCH",
      body: user,
    });
  }

  public async findByName(name: string, perPage: number): Promise<object[]> {
    return await this.$fetch(`/v1/users/find`, {
      params: { name, perPage },
      method: "GET",
    });
  }

  public async destroy(id: number): Promise<any> {
    return await this.$fetch(`/v1/users/${id}`, { method: "DELETE" });
  }
}

export default UserApi;
