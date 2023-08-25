import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

const API_URL = (selectionId: number) => `${BE_URL}/selections/${selectionId}`;

export default async function getSelection(selectionId: number) {
    const response = await fetchWithCredentials(`${API_URL(selectionId)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: JSON.stringify({
        //     categoryId,
        //     selectedOptions,
        //     title,
        //     description,
        // }),
    });
    // const data = await response.json();
    return response;
}
