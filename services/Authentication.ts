import axiosClient from "@/libs/axiosClient.lib";
import { API_ROUTES } from "@/configs/api.config";
import { tokenStorage } from "@/libs/tokenStorage.lib";
import { CredIn, TokenOut } from "@/types/authentication.type";
import { UserOut } from "@/types/user.type";

class Authentication {
  public static async login(credentials: CredIn): Promise<TokenOut> {
    const response = await axiosClient.post<TokenOut>(
      API_ROUTES.authentication.login(),
      credentials,
    );
    const { access_token, refresh_token } = response.data;
    tokenStorage.setTokens(access_token, refresh_token);
    return response.data;
  }

  public static async logout(refreshToken: string): Promise<void> {
    try {
      await axiosClient.post(API_ROUTES.authentication.logout(), {
        refresh_token: refreshToken,
      });
    } finally {
      tokenStorage.clearTokens();
    }
  }

  public static async getCurrentUser(): Promise<UserOut> {
    const response = await axiosClient.get<UserOut>(
      API_ROUTES.authentication.me(),
    );
    return response.data;
  }

  public static isAuthenticated(): boolean {
    return !!tokenStorage.getAccessToken();
  }
}

export { Authentication };
