import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

export default async function generateDocument(selectionId: number) {
    const API_URL = `${BE_URL}/chatgpt/generate-document`;
    const data = await fetchWithCredentials(`${API_URL}/${selectionId}`, {
        method: "POST",
    });
    return data;
}
