import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

const API_URL = `${BE_URL}/chatgpt/briefs`;

export default async function getResult() {
    const response = await fetchWithCredentials(API_URL, {
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
