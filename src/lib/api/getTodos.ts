import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

export default async function getTodos(selectionId: number) {
    const response = await fetchWithCredentials(
        `${BE_URL}/selections/${selectionId}/user-stories`,
        {
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
        }
    );
    // const data = await response.json();
    return response;
}
