import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

export default async function createTodos(briefId: number) {
    const data = await fetchWithCredentials(
        `${BE_URL}/chatgpt/briefs/${briefId}/user-stories`,
        {
            method: "POST",
            body: JSON.stringify({
                briefId,
            }),
        }
    );

    return data;
}
