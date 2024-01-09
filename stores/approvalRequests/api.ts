import Https from "~/server/Https";

export default class ApprovalRequestApi extends Https {
  constructor() {
    super();
  }

  public async approvalRequestByUserPaginate(
    page: number,
    perPage: number
  ): Promise<object> {
    return await this.$fetch("/v1/approval-requests/user/paginate", {
      method: "GET",
      params: { page, perPage },
    });
  }

  public async update(id: number, entityData: object): Promise<object> {
    return await this.$fetch(`/v1/approval-requests/${id}`, {
      method: "PATCH",
      body: entityData,
    });
  }

  public async approvalRequests(
    page: number,
    perPage: number
  ): Promise<object> {
    return await this.$fetch("/v1/approval-requests/paginate", {
      method: "GET",
      params: { page, perPage },
    });
  }
}
