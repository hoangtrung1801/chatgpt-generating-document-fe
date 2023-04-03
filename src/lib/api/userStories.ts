import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

const API_URL = `${BE_URL}`;

export async function updateUserStories(
    selectionID?: number,
    userStoryId?: number,
    status?: string
) {
    const data = await fetchWithCredentials(
        `${API_URL}/selections/${selectionID}/user-stories/${userStoryId}`,
        {
            method: "PUT",
            body: JSON.stringify({
                status: status,
            }),
        }
    );

    return data;
}
