import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

const API_URL = `${BE_URL}`;

export async function login(email?: string, password?: string) {
    const data = await fetchWithCredentials(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    return data;
}

export async function signup(name?: string, email?: string, password?: string) {
    const data = await fetchWithCredentials(`${API_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });

    return data;
}

export async function logout() {
    const data = await fetchWithCredentials(`${API_URL}/logout`, {
        method: "POST",
    });

    return data;
}
