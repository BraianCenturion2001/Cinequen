import { ENV } from "../utils";

export class Auth {
  async getMe(token) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.LOGIN}/`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;
  }

  async refreshToken(token) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REFRESH}/`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: token }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;
  }
}
