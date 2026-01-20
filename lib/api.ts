const uid = process.env.EXPO_PUBLIC_FT_API_UID;
const secret = process.env.EXPO_PUBLIC_FT_API_SECRET;

export const getClientToken = async () => {
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
    return data.access_token;
}

export const getUserDetails = async (login: string, token: string) => {
    const response = await fetch(`https://api.intra.42.fr/v2/users/${login.toLowerCase()}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to get user details');
    return await response.json();
}