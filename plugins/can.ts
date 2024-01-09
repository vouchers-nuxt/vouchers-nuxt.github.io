import { useUsersStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import bootstrap from "~/public/assets/js/bootstrap/bootstrap";

export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUsersStore();
  const { profile } = storeToRefs(userStore);

  return {
    provide: {
      can: (name: string) => {
        return computed(() => {
          const permissions = profile.value.permissions?.map(
            (permission: any) => permission.slug
          );
          if (permissions?.includes(name)) return true;
          return false;
        });
      },
    },
  };
});
