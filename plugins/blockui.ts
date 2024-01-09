export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      blockui: () => {
        return {
          start() {
            $.blockUI({
              message:
                '<div class="sk-wave sk-primary"><div class="sk-rect sk-rect1 bg-info"></div> <div class="sk-rect sk-rect2 bg-info"></div> <div class="sk-rect sk-rect3 bg-info"></div> <div class="sk-rect sk-rect4 bg-info"></div> <div class="sk-rect sk-rect5 bg-info"></div></div>',
              css: {
                backgroundColor: "transparent",
                border: "0",
              },
              overlayCSS: {
                backgroundColor: "#fff",
                opacity: 0.8,
              },
            });
          },
          stop() {
            $.unblockUI();
          },
        };
      },
    },
  };
});
