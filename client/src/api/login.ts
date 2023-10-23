import { saveAccessTokenToLocalStorage } from "../utils/tokenHandler";
import { UserInfo } from "../types/user";
import { client } from "./client";

type LoginResult = "success" | "fail";

const BASE_URL = "";

export type LoginResultWithToken =
  | {
      result: "success";
      access_token: string;
    }
  | {
      result: "fail";
      access_token: null;
    };

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  if (loginRes.ok) {
    const loginResponseData = await loginRes.json();
    saveAccessTokenToLocalStorage(loginResponseData.access_token);
    return "success";
  }
  return "fail";
};

export const getCurrentUserInfo = async (): Promise<UserInfo | null> => {
  const userInfoRes = await client(`${BASE_URL}/profile`, {
    method: "GET",
  });

  if (userInfoRes.ok) {
    return userInfoRes.json() as Promise<UserInfo>;
  }

  return null;
};
