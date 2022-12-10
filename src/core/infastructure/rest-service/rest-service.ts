import { METHOD } from "./constants";

type RestService = {
  method?: string;
  url: string;
  headers: HeadersInit;
  body?: any;
};

export const restService = async ({
  method = METHOD.GET,
  url,
  headers,
  body,
}: RestService) => {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (data.status === "fail") {
    throw new Error(data.message);
  }
  return data;
};
