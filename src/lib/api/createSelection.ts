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
