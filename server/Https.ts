import { RuntimeConfig } from "nuxt/schema";

class Https {
  private configApp: RuntimeConfig;
  protected $fetch;
  constructor() {
    this.configApp = useRuntimeConfig();
    const token = window.localStorage.getItem("token");
    this.$fetch = $fetch.create({
      baseURL: this.configApp.public.baseURL,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  }
}

export default Https;
