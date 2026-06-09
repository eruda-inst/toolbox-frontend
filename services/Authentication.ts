import axiosClient from "@/libs/axiosClient.lib";
import { API_ROUTES } from "@/configs/api.config";
import { tokenStorage } from "@/libs/tokenStorage.lib";

interface LoginCredentials {
  email: string;
  senha: string;
}

interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface User {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
  criado_em: string;
  atualizado_em: string | null;
  id_grupo: number;
}

class Authentication {
  public static async login(
    credentials: LoginCredentials,
  ): Promise<AuthTokens> {
    const response = await axiosClient.post<AuthTokens>(
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

  public static async getCurrentUser(): Promise<User> {
    const response = await axiosClient.get<User>(
      API_ROUTES.authentication.me(),
    );
    return response.data;
  }

  public static isAuthenticated(): boolean {
    return !!tokenStorage.getAccessToken();
  }
}

export { Authentication };
export type { LoginCredentials, AuthTokens, User };
