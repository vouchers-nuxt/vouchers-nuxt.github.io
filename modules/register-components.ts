import { addComponent, defineNuxtModule } from "@nuxt/kit";
// import {Multiselect as VueMultiselect} from 'vue-multiselect'
export default defineNuxtModule({
  async setup() {
    // import { MyComponent as MyAutoImportedComponent } from 'my-npm-package'
    await addComponent({
      name: "VueMultiselect",
      export: "Multiselect",
      filePath: "vue-multiselect",
    });
  },
});
