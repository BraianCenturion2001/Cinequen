const SERVER_IP = "192.168.100.7:8000";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api`,
  API_ROUTES: {
    LOGIN: "auth/login",
    REFRESH: "auth/token/refresh",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
  VALIDATE_ENTRADA: "entradas",
};
