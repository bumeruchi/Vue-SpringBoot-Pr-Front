import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/common.css";
import axios from "./utils/axios";
import store from "./vuex/store";

// 디버깅: store가 제대로 가져와졌는지 확인
console.log('Store:', store);
console.log('Store State:', store.state);



// Axios 기본 설정
axios.defaults.baseURL = "http://localhost:8081"; // Spring Boot 서버 URL
axios.defaults.headers.common["Content-Type"] = "application/json";

const app = createApp(App);

// 전역 속성 등록
app.config.globalProperties.$axios = axios; // Axios 전역 등록
app.config.globalProperties.$serverUrl = "http://localhost:8081"; // API 서버 URL 전역 등록
app.config.globalProperties.$store = store;

// Vue 플러그인 사용
app.use(store).use(router).use(store).mount("#app");
