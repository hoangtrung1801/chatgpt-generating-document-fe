import { BE_URL } from "lib/config";

const API_URL = `${BE_URL}`;

export async function login(email?: string, password?: string) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    const data = await response.json();
    return data;
}
export async function signup(name?: string, email?: string, password?: string) {
    const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });
    const data = await response.json();
    return data;
}

export async function logout() {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({}),
    });
    const data = await response.json();
    return data;
}
