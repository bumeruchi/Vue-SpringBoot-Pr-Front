import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/common.css";
import axios from "axios";
import store from "./vuex/store";
// Vuetify 관련 임포트
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


// Vuetify 인스턴스 생성
const vuetify = createVuetify({
  components,
  directives,
  // 테마 설정 등 추가 설정 가능
});

// Axios 기본 설정
axios.defaults.baseURL = "http://localhost:8081"; // Spring Boot 서버 URL
axios.defaults.headers.common["Content-Type"] = "application/json";

const app = createApp(App);

// 전역 속성 등록
app.config.globalProperties.$axios = axios; // Axios 전역 등록
app.config.globalProperties.$serverUrl = "http://localhost:8081"; // API 서버 URL 전역 등록
app.config.globalProperties.$store = store;

// Vue 플러그인 사용
app.use(store).use(router).use(store).use(vuetify).mount("#app");
