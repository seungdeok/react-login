import { getAccessTokenFromLocalStorage } from "../utils/tokenHandler";

export const client = (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const token = getAccessTokenFromLocalStorage();
  const newOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, newOptions);
};
