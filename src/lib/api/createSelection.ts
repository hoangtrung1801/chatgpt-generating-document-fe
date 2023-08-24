import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

const API_URL = `${BE_URL}/selections`;

interface IBody {
    username: string;
    projectName: string;
    description: string;
    appId: number;
    selectedOptions: number[];
}

export default async function createSelection(body: IBody) {
    const data = await fetchWithCredentials(API_URL, {
        method: "POST",
        body: JSON.stringify(body),
    });

    return data;
}

export async function updateSelection(body: IBody, selection_id: number) {
    const data = await fetchWithCredentials(`${API_URL}/${selection_id}`, {
        method: "PUT",
        body: JSON.stringify(body),
    });

    return data;
}
