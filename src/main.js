import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/common.css";
import axios from "axios";

// Axios 기본 설정
axios.defaults.baseURL = "http://localhost:8081"; // Spring Boot 서버 URL
axios.defaults.headers.common["Content-Type"] = "application/json";

const app = createApp(App);

// 전역 속성 등록
app.config.globalProperties.$axios = axios; // Axios 전역 등록
app.config.globalProperties.$serverUrl = "http://localhost:8081"; // API 서버 URL 전역 등록

// Vue 플러그인 사용
app.use(store).use(router).mount("#app");
