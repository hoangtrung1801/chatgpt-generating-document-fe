import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

const API_URL = `${BE_URL}/selections`;

export default async function createSelection(
    categoryId: number,
    selectedOptions: (number | undefined)[],
    title: string,
    description: string
) {
    const data = await fetchWithCredentials(API_URL, {
        method: "POST",
        body: JSON.stringify({
            categoryId,
            selectedOptions,
            title,
            description,
        }),
    });

    return data;
}
