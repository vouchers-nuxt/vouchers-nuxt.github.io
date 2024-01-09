function isAuthenticated() {
  if (process.browser && window !== undefined) {
    const token = window.localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }
  return true;
}

export default defineNuxtRouteMiddleware((to, from) => {
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  // const token = localStorage.getItem("token");
  if (!isAuthenticated()) {
    navigateTo("/");
  }
});
