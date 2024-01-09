import Https from "~/server/Https";
import type { Metrics } from ".";

export default class VoucherApi extends Https {
  constructor() {
    super();
  }

  async paginate(page: number, perPage: number): Promise<object> {
    return await this.$fetch(`/v1/vouchers/paginate`, {
      method: "GET",
      params: { page, perPage },
    });
  }

  public async paginateVoucherUser(
    page: number,
    perPage: number
  ): Promise<object> {
    return await this.$fetch("/v1/vouchers/user", {
      method: "GET",
      params: { page, perPage },
    });
  }

  public async getMetricsUser(): Promise<Metrics> {
    return await this.$fetch("/v1/vouchers/metrics-user", {
      method: "GET",
    });
  }

  public async getMetrics(): Promise<Metrics> {
    return await this.$fetch("/v1/vouchers/metrics", {
      method: "GET",
    });
  }

  async find(id: number): Promise<object> {
    return await this.$fetch(`/v1/vouchers/${id}`, {
      method: "GET",
    });
  }

  async create(voucher: object): Promise<object> {
    return await this.$fetch("/v1/vouchers", {
      method: "POST",
      body: voucher,
    });
  }

  async update(id: number, voucher: object): Promise<object> {
    return await this.$fetch(`/v1/vouchers/${id}`, {
      method: "PATCH",
      body: voucher,
    });
  }

  async destroy(id: number): Promise<object> {
    return await this.$fetch(`/v1/vouchers/${id}`, {
      method: "DELETE",
    });
  }
}
