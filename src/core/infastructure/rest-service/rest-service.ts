import { METHOD } from "./constants";

type RestService = {
  method?: string;
  url: string;
  headers: HeadersInit;
};

export const restService = async ({
  method = METHOD.GET,
  url,
  headers,
}: RestService) => {
  const response = await fetch(url, { method, headers });
  const data = await response.json();
  if (data.status === "fail") {
    throw new Error(data.message);
  }
  return data;
};
