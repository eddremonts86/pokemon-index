import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount } from "@vue/test-utils";
import Home from "@/views/HomeView.vue";
Vue.use(Vuetify);
Vue.use(Vuex);

describe("Home Page", () => {
  const wrapper = shallowMount(Home);
  it("Has been rendered the home pages", () => {
    expect(wrapper.html()).toContain("Pokemon");
  });

  it("Has been rendered the filters in home pages", () => {
    expect(wrapper.html()).toContain("Filters");
  });
});
