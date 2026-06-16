const DEFAULT_BASE_API_URL = "http://localhost:8000";
const ENV_BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
let BASE_API_URL = DEFAULT_BASE_API_URL;

if (ENV_BASE_API_URL) {
  if (ENV_BASE_API_URL?.endsWith("/")) {
    BASE_API_URL = ENV_BASE_API_URL.slice(0, -1);
  } else {
    BASE_API_URL = ENV_BASE_API_URL;
  }
}

const API_ENDPOINT_BASES = {
  authentication: `${BASE_API_URL}/api/v1/autenticacao`,
  perm: `${BASE_API_URL}/api/v1/permissoes`,
  resetPassword: `${BASE_API_URL}/api/v1/redefinir-senha`,
};

const API_ROUTES = {
  authentication: {
    login: () => `${API_ENDPOINT_BASES.authentication}/login`,
    refreshToken: () => `${API_ENDPOINT_BASES.authentication}/login`,
    logout: () => `${API_ENDPOINT_BASES.authentication}/logout`,
    me: () => `${API_ENDPOINT_BASES.authentication}/mim`,
  },
  perm: {
    getByUserId: (id: number) => `${API_ENDPOINT_BASES.perm}/usuario/id/${id}`,
    getByGroupId: (id: number) => `${API_ENDPOINT_BASES.perm}/grupo/id/${id}`,
    getByGroupName: (name: string) =>
      `${API_ENDPOINT_BASES.perm}/grupo/nome/${name}`,
  },
  resetPassword: {
    requestOtp: () => `${API_ENDPOINT_BASES.resetPassword}/solicitar-otp`,
    verifyOtp: () => `${API_ENDPOINT_BASES.resetPassword}/verificar-otp`,
    resetPassword: () => `${API_ENDPOINT_BASES.resetPassword}/`,
  },
};

export { API_ROUTES, DEFAULT_BASE_API_URL };
