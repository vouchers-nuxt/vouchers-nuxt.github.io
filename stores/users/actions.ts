import { useUsersStore } from "./index";
import UserApi from "./api";
import Swal from "sweetalert2";

export default {
  async signin(user: any) {
    const userStore = useUsersStore();
    const data: any = await new UserApi().signin(user);

    window.localStorage.setItem("token", data.token);
    userStore.error = "";
    userStore.token = data.token;
  },

  async findManager(name: string, perPage: number) {
    try {
      const userStore = useUsersStore();
      const users: Object[] = await new UserApi().findManager(name, perPage);
      userStore.users = users;
    } catch (err) {
      const errData = err as any;
      let message = errData.data.message;
      Swal.fire({
        title: "Error!",
        text: message || "Não foi carregar usuário!",
        icon: "error",
      });
    }
  },

  async getProfile() {
    try {
      const userStore = useUsersStore();
      const data: any = await new UserApi().profile();

      userStore.profile = data;
    } catch (err) {
      window.localStorage.removeItem("token");
      Swal.fire({
        title: "Error!",
        text:
          "Não foi possivel recuperar informações de usuário, realize o login novamente.",
        icon: "error",
        confirmButtonText: "Ok!",
      });
      navigateTo("/");
    }
  },

  async getUsersPaginate(page: number, perPage: number) {
    try {
      const userStore = useUsersStore();
      const body: any = await new UserApi().userPaginate(page, perPage);

      userStore.usersPaginate = body;
    } catch (err) {
      const errData = err as any;
      let message = errData.data?.message;
      if (errData.data?.code == "E_AUTHORIZATION_FAILURE") {
        message = "Acesso nãio autorizado à lista de usuários";
      }
      Swal.fire({
        title: "Error!",
        text: message || "Não foi possivel recuperar informações de usuários!",
        icon: "error",
      });
    }
  },

  async createUser(user: object) {
    return await new UserApi().create(user);
  },

  async updateUser(id: number, user: object) {
    return await new UserApi().update(id, user);
  },

  async getUser(id: number) {
    try {
      return await new UserApi().find(id);
    } catch (err) {
      const errData = err as any;
      let message = errData.data.message;
      Swal.fire({
        title: "Error!",
        text: message || "Não foi carregar usuário!",
        icon: "error",
      });
    }
  },

  async findUsers(name: string, perPage: number) {
    try {
      const userStore = useUsersStore();
      const data: object[] = await new UserApi().findByName(name, perPage);

      userStore.users = data;
    } catch (err) {
      const errData = err as any;
      let message = errData.data.message;
      Swal.fire({
        title: "Error!",
        text: message || "Não foi carregar usuário!",
        icon: "error",
      });
    }
  },

  async destroyUser(id: number) {
    return await new UserApi().destroy(id);
  },
};
