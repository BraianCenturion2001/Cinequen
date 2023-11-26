import { ENV } from "../utils";

export class Entrada {
  async getEntrada(url) {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;
  }

  async validarEntrada(id) {
    const url = `${ENV.BASE_API}/${ENV.VALIDATE_ENTRADA}/${id}/`;

    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: 1 }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;
  }
}
