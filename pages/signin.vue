<template>
  <div class="container vh-100 d-flex align-items-center">
    <!-- Outer Row -->
    <div class="row vw-100 justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div
                class="col-lg-6 d-none d-flex justify-content-center align-items-center border-end d-lg-block"
                style="
                  background-image: url('/assets/images/Logo-Vedapack.png');
                  background-repeat: no-repeat;
                  background-position: center;
                "
              ></div>
              <div class="col-lg-6">
                <div class="py-5 px-4">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Bem Vindo!</h1>
                  </div>
                  <form class="user">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control rounded-pill"
                        id="exampleInputEmail"
                        v-model="user.username"
                        aria-describedby="emailHelp"
                        placeholder="Usuário"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        v-model="user.password"
                        class="form-control rounded-pill"
                        id="exampleInputPassword"
                        placeholder="Senha"
                      />
                    </div>
                    <div v-if="error" class="form-group text-center">
                      <small class="text-danger">{{ error }}</small>
                    </div>
                    <a
                      @click="submit"
                      data-style="zoom-in"
                      class="btn ladda-button btn-primary rounded-pill btn-block"
                    >
                      Entrar
                    </a>
                  </form>
                  <hr />
                  <div class="text-center">
                    <a class="small" href="forgot-password.html"
                      >Esqueci a senha</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Ladda from "ladda";
import { useUsersStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const userStore = useUsersStore();

const user = useState("user", () => ({ username: "", password: "" }));
let { error } = storeToRefs(userStore);

onMounted(() => {
  document.body.classList.add("bg-gradient-primary");
});
definePageMeta({
  middleware: "auth",
});

async function submit() {
  const element = document.querySelector(".ladda-button") as HTMLButtonElement;
  const ladda = Ladda.create(element);
  try {
    ladda.start();
    await userStore.signin(user.value);
    navigateTo("/dashboard");
  } catch (err) {
    const errData = err as any;
    if (errData.data?.code == "E_INVALID_AUTH_UID") {
      userStore.error = "Usuário inválido";
    } else if (errData.data?.code == "E_INVALID_AUTH_PASSWORD") {
      userStore.error = "Senha inválida";
    } else {
      userStore.error = errData.data?.message || errData.message;
    }
  } finally {
    ladda.stop();
  }
}
</script>
