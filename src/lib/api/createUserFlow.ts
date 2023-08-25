import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

export default async function createUserFlow(selection_id: number) {
    console.log("selection_id: ", selection_id);
    const data = await fetchWithCredentials(
        `${BE_URL}/chatgpt/generate-user-flow/${selection_id}`,
        {
            method: "POST",
        }
    );

    return data;
}
