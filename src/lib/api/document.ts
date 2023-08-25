import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

export async function deleteDocument(selectionId: number) {
    const API_URL = `${BE_URL}/selections`;
    const data = await fetchWithCredentials(`${API_URL}/${selectionId}`, {
        method: "DELETE",
    });
    return data;
}

export async function updateDocument({
    selectionId,
    payload,
}: {
    selectionId: number;
    payload: any;
}) {
    console.log("payload:", payload);
    const API_URL = `${BE_URL}/selections`;
    const data = await fetchWithCredentials(`${API_URL}/${selectionId}`, {
        method: "PUT",
        body: JSON.stringify({
            ...payload,
        }),
    });
    return data;
}
