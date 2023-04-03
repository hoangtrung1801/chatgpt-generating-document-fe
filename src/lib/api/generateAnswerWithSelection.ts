import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

const API_URL = `${BE_URL}/chatgpt/briefs`;

export default async function generateAnswerWithSelection(selectionId: number) {
    const data = await fetchWithCredentials(API_URL, {
        method: "POST",
        body: JSON.stringify({
            selectionId,
        }),
    });
    return data;
}
