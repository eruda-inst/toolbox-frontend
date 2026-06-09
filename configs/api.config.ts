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
};

const API_ROUTES = {
  authentication: {
    login: () => `${API_ENDPOINT_BASES.authentication}/login`,
    refreshToken: () => `${API_ENDPOINT_BASES.authentication}/login`,
    logout: () => `${API_ENDPOINT_BASES.authentication}/logout`,
    me: () => `${API_ENDPOINT_BASES.authentication}/mim`,
  },
};

export { API_ROUTES, DEFAULT_BASE_API_URL };
