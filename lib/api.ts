const uid = process.env.EXPO_PUBLIC_FT_API_UID;
const secret = process.env.EXPO_PUBLIC_FT_API_SECRET;

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

const EXPIRATION_BUFFER = 5 * 60 * 1000;

const isTokenValid = (): boolean => {
  if (!tokenCache) return false;

  return Date.now() < tokenCache.expiresAt - EXPIRATION_BUFFER;
};

export const getClientToken = async (): Promise<string> => {
  if (isTokenValid() && tokenCache) {
    return tokenCache.token;
  }

  const response = await fetch('https://api.intra.42.fr/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: uid!,
      client_secret: secret!,
    }).toString(),
  });

  if (!response.ok) throw new Error('Failed to get client token');

  const data = await response.json();

  const accessToken = data.access_token;
  const expiresIn = data.expires_in | 7200;

  tokenCache = {
    token: accessToken,
    expiresAt: Date.now() + expiresIn * 1000,
  };

  return accessToken;
};

export const getUserDetails = async (login: string, token: string) => {
  const response = await fetch(`https://api.intra.42.fr/v2/users/${login.toLowerCase()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Failed to get user details');
  const data = await response.json();
  return data;
};
