const SERVER_IP = "192.168.0.198:8000";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api`,
  API_ROUTES: {
    LOGIN: "auth/login",
    REFRESH: "auth/token/refresh",
    ME: "auth/me",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
  VALIDATE_ENTRADA: "entradas",
};
