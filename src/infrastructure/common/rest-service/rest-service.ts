import { METHOD } from "./constants";

type RestService = {
  method?: string;
  url: string;
  headers?: HeadersInit;
  body?: Object;
};

export const restService = async ({
  method = METHOD.GET,
  url,
  headers = {},
  body,
}: RestService) => {
  const response = await fetch(url, {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) return Promise.reject(await response.json());

  if (response.status === 204) return;

  const data = await response.json();

  return data;
};
